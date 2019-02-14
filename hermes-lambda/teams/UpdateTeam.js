const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

/*
  1. if runner Create record for team using teamId
  2. if coach, update fields coach provided in Teams:
    (description, joinCode)
  3. create event
 */

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
  try {
    const { teamId, username, userId, joinCode } = requestBody
    //fetch team, compare codes, update training
    const team = await fetchTeamById(teamId)
    if (team && team.joinCode === joinCode) {
      const updated = await joinTeam(teamId, userId, username)
      console.log('Successfully added member', updated)
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    } else {
      return errorResponse('Could not join the team. Wrong join code', awsRequestId)
    }
  } catch (err) {
    console.error(err)
    return errorResponse(err.message, awsRequestId)
  }
}

const fetchTeamById = teamId => {
  return ddb.get({})
}

const joinTeam = (teamId, userId, username) => {
  return ddb
    .put({
      TableName: 'TeamMembers',
      Item: {
        teamId,
        userId,
        username,
        joinedAt: new Date(),
      },
    })
    .promise()
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
