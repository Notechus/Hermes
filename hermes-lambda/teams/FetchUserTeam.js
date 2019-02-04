const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, pathParameters } = event
  console.log(`Received event ("${awsRequestId}"):`, event)

  if (!requestContext.authorizer) {
    return errorResponse(500, 'Authorization not configured', awsRequestId)
  }
  const username = pathParameters.username
  const authUsername = requestContext.authorizer.claims['cognito:username']
  const userType = requestContext.authorizer.claims['custom:type']
  if (username !== authUsername) {
    return errorResponse(403, "You don't have permissions to that resource", awsRequestId)
  }

  console.log(`Fetching ${authUsername} team`)
  try {
    const team = await fetchTeam(authUsername, userType, awsRequestId)
    console.log('team', team)
    return {
      statusCode: 200,
      body: JSON.stringify(team),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.error(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchTeam = (username, type, awsRequestId) => {
  if (type === 'Coach') {
    console.log('fetching user coach teams')
    return fetchCoachTeam(username, awsRequestId)
  } else {
    console.log('fetching membership teams')
    return fetchRunnerTeam(username, awsRequestId)
  }
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
    const team = teams.Items[0]
    const teamDetails = await fetchTeamById(team.teamId)
    return Object.assign({}, team, teamDetails.Item)
  } else {
    return {}
  }
}

const fetchCoachTeam = async username => {
  return ddb
    .scan({
      TableName: 'Teams',
      FilterExpression: 'teamOwner = :r',
      ExpressionAttributeValues: { ':r': username },
    })
    .promise()
}

const fetchTeamById = async teamId => {
  console.log('fetching team by id', teamId)
  return ddb
    .get({
      TableName: 'Teams',
      Key: {
        teamId: teamId,
      },
    })
    .promise()
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
