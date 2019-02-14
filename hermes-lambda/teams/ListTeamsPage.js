const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext } = event
  console.log(`Received event ("${awsRequestId}"):`, event)

  if (!requestContext.authorizer) {
    return errorResponse(500, 'Authorization not configured', awsRequestId)
  }

  console.log(`Fetching teams list`)
  try {
    const teams = await fetchTeams()
    console.log('Successfully fetched teams:', teams)
    return {
      statusCode: 200,
      body: JSON.stringify(teams),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.error(err)
    return errorResponse(500, err.message, awsRequestId)
  }
}

const fetchTeams = () => {
  //TODO: change this full table scan later
  return ddb
    .scan({
      TableName: 'Teams',
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
