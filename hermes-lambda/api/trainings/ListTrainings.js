const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

const AVAILABLE_PARAMETERS = ['trainingDate', 'coach', 'runner', 'completed']

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, queryStringParameters } = event
  console.log(`Received event ("${awsRequestId}"):`, event)

  if (!requestContext.authorizer) {
    return errorResponse(500, 'Authorization not configured', awsRequestId)
  }

  console.log(`Fetching ${queryStringParameters} trainings`)
  try {
    const trainings = await fetchTrainings(queryStringParameters)
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

const fetchTrainings = queryParameters => {
  const params = {
    TableName: 'Trainings',
    FilterExpression: '',
    ExpressionAttributeValues: {},
  }
  const itemProperties = Object.keys(queryParameters).filter(e => AVAILABLE_PARAMETERS.includes(e))
  itemProperties.forEach(property => {
    switch (property) {
      case 'trainingDate':
        const [start, end] = queryParameters[property].split(',')
        params.FilterExpression += `${property} between :start and :end,`
        params.ExpressionAttributeValues[':start'] = start
        params.ExpressionAttributeValues[':end'] = end
        break
      case 'completed':
        params.FilterExpression += 'completed = :completed,'
        params.ExpressionAttributeValues[':completed'] = queryParameters[property] === 'true'
        break
      default:
        params.FilterExpression += `${property} = :${property},`
        params.ExpressionAttributeValues[`:${property}`] = queryParameters[property]
        break
    }
  })
  if (params.FilterExpression.endsWith(',')) {
    params.FilterExpression = params.FilterExpression.substr(0, params.FilterExpression.length - 1)
  }

  console.log('fetching trainings with params', params)
  return ddb.scan(params).promise()
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
