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
  const type = requestContext.authorizer.claims['custom:type']
  if (username !== authUsername && type !== 'Coach') {
    return errorResponse(403, "You don't have permissions to that resource", awsRequestId)
  }

  console.log(`Fetching ${username} trainings`)

  try {
    const trainings = await fetchTrainings(username)
    console.log('trainings records', trainings.Items.length)
    return {
      statusCode: 200,
      body: JSON.stringify(trainings.Items),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.log(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchTrainings = username => {
  return ddb
    .scan({
      TableName: 'Trainings',
      FilterExpression: 'runner = :r',
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
