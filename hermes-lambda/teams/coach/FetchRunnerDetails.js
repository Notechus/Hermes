const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, pathParameters, queryStringParameters } = event
  console.log(`Received event ("${awsRequestId}"):`, event)

  if (!requestContext.authorizer) {
    return errorResponse(500, 'Authorization not configured', awsRequestId)
  }
  const username = pathParameters.username
  const userType = requestContext.authorizer.claims['custom:type']
  const startDate = queryStringParameters.start || ''
  const endDate = queryStringParameters.end || ''
  if (userType !== 'Coach') {
    return errorResponse(403, "You don't have permissions to that resource", awsRequestId)
  }

  console.log(`Fetching ${username}: ${startDate} - ${endDate} details for coach `)
  try {
    const runnerTeamDetails = await fetchRunnerTeam(username)
    const trainings = await fetchRunnerTrainingsDetails(username, startDate, endDate, awsRequestId)
    console.log('got runner details', runnerTeamDetails, trainings ? trainings.length : 0)
    return {
      statusCode: 200,
      body: JSON.stringify(
        Object.assign({}, { runner: runnerTeamDetails, trainings: trainings.Items })
      ),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.error(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchRunnerTrainingsDetails = async (username, startDate, endDate, awsRequestId) => {
  try {
    const trainings = await fetchUserTrainings(username, startDate, endDate)
    console.log('got users trainings', trainings)
    return trainings
  } catch (err) {
    console.log(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchUserTrainings = (username, startDate, endDate) => {
  return ddb
    .scan({
      TableName: 'Trainings',
      FilterExpression: 'runner = :r and trainingDate between :start and :end',
      ExpressionAttributeValues: { ':r': username, ':start': startDate, ':end': endDate },
    })
    .promise()
}

const fetchRunnerTeam = async username => {
  const teams = await ddb
    .scan({
      TableName: 'TeamMembers',
      FilterExpression: 'username = :r',
      ExpressionAttributeValues: {
        ':r': username,
      },
    })
    .promise()

  console.log('fetched from team members', teams)

  if (teams.Items.length === 1) {
    console.log('team', teams)
    return teams.Items[0]
  } else {
    return {}
  }
}

const errorResponse = (code, errorMessage, awsRequestId) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
