const AWS = require('aws-sdk')
const uuid = require('uuid')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, body } = event

  if (!requestContext.authorizer) {
    return errorResponse('Authorization not configured', awsRequestId)
  }

  const teamId = uuid.v4()
  console.log(`Received event ("${teamId}"):`, event)
  const username = requestContext.authorizer.claims['cognito:username']

  const joinCode = Math.floor(Math.random() * 900000) + 100000
  const requestBody = JSON.parse(body)

  console.log('Received request body: ', requestBody)

  const team = {
    teamId: teamId,
    teamOwner: username,
    name: requestBody.teamName,
    description: requestBody.teamDescription,
    joinCode: joinCode,
    members: [],
    creationDate: new Date().toISOString(),
  }

  console.log('Creating new team: ', team)

  try {
    let response = await saveTeam(team)
    console.log('Successfully saved team', response)

    return {
      statusCode: 201,
      body: JSON.stringify(team),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.error(err)
    return errorResponse(err.message, awsRequestId)
  }
}

const saveTeam = team => {
  return ddb.put({ TableName: 'Teams', Item: team }).promise()
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
