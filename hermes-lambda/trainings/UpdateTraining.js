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

  const requestBody = JSON.parse(body)
  try {
    if (userType === 'Member') {
      const updatedTraining = await updateTrainingCompletion(requestBody, username)
      console.log('Successfully updated training', updatedTraining)
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    } else if (userType === 'Coach') {
      const updatedTraining = await updateTrainingDetails(requestBody, awsRequestId)
      console.log('Successfully updated training', updatedTraining)
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    }
  } catch (err) {
    console.error(err)
    return errorResponse(err.message, awsRequestId)
  }
}

const updateTrainingDetails = async requestBody => {
  const itemProperties = Object.keys(requestBody).filter(
    e => !['trainingId', 'runner', 'creationDate', 'coach'].includes(e)
  )
  console.log('Received request body: ', requestBody)

  const firstProperty = itemProperties.splice(0, 1)
  const params = {
    TableName: 'Trainings',
    Key: {
      trainingId: requestBody.trainingId,
      runner: username,
    },
    UpdateExpression: `set ${firstProperty} = :${firstProperty}`,
    ConditionExpression: 'runner = :runner',
    ExpressionAttributeValues: { ':runner': username },
    ReturnValues: 'UPDATED_NEW',
  }
  params.ExpressionAttributeValues[`:${firstProperty}`] = requestBody[firstProperty]

  itemProperties.forEach(property => {
    params.UpdateExpression += `, ${property} = :${property}`
    params.ExpressionAttributeValues[`:${property}`] = requestBody[property]
  })

  console.log('Updating training: ', params)
  return updateTraining(params)
}

const updateTrainingCompletion = (training, username) => {
  const params = {
    TableName: 'Trainings',
    Key: {
      trainingId: training.trainingId,
      runner: username,
    },
    UpdateExpression:
      'set activities = :activities, completed = :completed, modificationTime = :time',
    ConditionExpression: 'runner = :runner',
    ExpressionAttributeValues: {
      ':runner': username,
      ':completed': training.completed,
      ':activities': training.activities,
      ':time': new Date(),
    },
    ReturnValues: 'UPDATED_NEW',
  }
  return updateTraining(params)
}

const updateTraining = params => {
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
