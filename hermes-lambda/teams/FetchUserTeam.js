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
    console.log('teams records', team)
    const teams = team.Items
    if (teams.length === 1) {
      console.log('team', teams)
      return {
        statusCode: 200,
        body: JSON.stringify(teams[0]),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    } else if (teams.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    } else {
      return {
        statusCode: 500,
        body: 'Wrong number of assigned teams',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
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

const fetchRunnerTeam = username => {
  return ddb
    .scan({
      TableName: 'Teams',
      FilterExpression: 'contains(members, :r)',
      ExpressionAttributeValues: { ':r': username },
    })
    .promise()
}

const fetchCoachTeam = username => {
  return ddb
    .scan({
      TableName: 'Teams',
      FilterExpression: 'teamOwner = :r',
      ExpressionAttributeValues: { ':r': username },
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
