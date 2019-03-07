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

  const { username } = pathParameters

  console.log(`Fetching ${username} profile`)
  try {
    const userProfile = await fetchProfile(username)
    console.log('profile ', userProfile)
    return {
      statusCode: 200,
      body: JSON.stringify(userProfile.Item),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.log(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchProfile = username => {
  const params = {
    TableName: 'UserProfile',
    Key: {
      username: username,
    },
  }
  console.log('fetching user profile with params', params)
  return ddb.get(params).promise()
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
