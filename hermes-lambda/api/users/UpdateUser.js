const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

const ALLOWED_PROPERTIES = ['email', 'firstName', 'lastName', 'gender', 'memo', 'about', 'avatar']

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, body, pathParameters } = event

  if (!requestContext.authorizer) {
    return errorResponse('Authorization not configured', awsRequestId)
  }

  console.log(`Received event ("${awsRequestId}"):`, event)
  const username = pathParameters.username

  const requestBody = JSON.parse(body)
  try {
    const updatedTraining = await updateUserProfile(username, requestBody)
    console.log('Successfully updated training', updatedTraining)
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.error(err)
    return errorResponse(err.message, awsRequestId)
  }
}

const updateUserProfile = async (username, requestBody) => {
  const itemProperties = Object.keys(requestBody).filter(e => ALLOWED_PROPERTIES.includes(e))
  console.log('Received request body: ', requestBody)

  const firstProperty = itemProperties.splice(0, 1)
  const params = {
    TableName: 'UserProfile',
    Key: {
      username: username,
    },
    UpdateExpression: `set ${firstProperty} = :${firstProperty}`,
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  }
  params.ExpressionAttributeValues[`:${firstProperty}`] = requestBody[firstProperty]

  itemProperties.forEach(property => {
    params.UpdateExpression += `, ${property} = :${property}`
    params.ExpressionAttributeValues[`:${property}`] = requestBody[property]
  })

  console.log('Updating user profile: ', params)
  return ddb.update(params).promise()
}

const errorResponse = (errorMessage, awsRequestId) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
