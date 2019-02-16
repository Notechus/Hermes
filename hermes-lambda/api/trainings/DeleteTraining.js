const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, body } = event

  if (!requestContext.authorizer) {
    return errorResponse('Authorization not configured', awsRequestId)
  }

  console.log(`Received event ("${awsRequestId}"):`, event)
  const username = requestContext.authorizer.claims['cognito:username']
  const userType = requestContext.authorizer.claims['custom:type']
  const [trainingId, runner] = pathParameters.trainingId

  if (userType !== 'Coach') {
    return errorResponse(403, "You don't have permissions to that resource", awsRequestId)
  }

  const requestBody = JSON.parse(body)
  console.log('Received request body: ', requestBody)

  const params = {
    TableName: 'Trainings',
    Key: {
      trainingId: trainingId,
      runner: runner,
    },
    ConditionExpression: 'coach = :coach',
    ExpressionAttributeValues: { ':coach': username },
  }

  console.log('Deleting training: ', params)
  try {
    let deletedTraining = await deleteTraining(params)
    console.log('Successfully deleted training', deletedTraining)
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

const deleteTraining = params => {
  return ddb.delete(params).promise()
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
