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

  const [trainingId, runner] = pathParameters.trainingId ? pathParameters.trainingId.split(',') : []

  console.log(`Fetching ${trainingId}, ${runner}`)
  try {
    const training = await fetchTraining(trainingId, runner)
    console.log('trainings records', training)
    return {
      statusCode: 200,
      body: JSON.stringify(training.Item),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.log(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchTraining = (trainingId, runner) => {
  const params = {
    TableName: 'Trainings',
    Key: {
      trainingId: trainingId,
      runner: runner,
    },
  }
  console.log('fetching training with params', params)
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
