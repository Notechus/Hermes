const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

AWS.config.update({ region: 'eu-west-1' })

const AVAILABLE_PARAMETERS = ['member', 'owner']

exports.handler = async (event, context) => {
  const { awsRequestId } = context
  const { requestContext, queryStringParameters } = event
  console.log(`Received event ("${awsRequestId}"):`, event)

  if (!requestContext.authorizer) {
    return errorResponse(500, 'Authorization not configured', awsRequestId)
  }

  const authUsername = requestContext.authorizer.claims['cognito:username']
  const userType = requestContext.authorizer.claims['custom:type']

  console.log(`Fetching teams list`)
  try {
    const teams = await fetchTeams(queryStringParameters, authUsername, userType)
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

const fetchTeams = async (queryParameters, username, userType) => {
  if (queryParameters && queryParameters.owner && userType === 'Coach') {
    const teams = await getCoachTeams(queryParameters.owner)
    return Promise.all(
      teams.Items.map(async item => {
        const members = await getTeamMembers(item.teamId)
        return Object.assign({}, item, { members: members.Items })
      })
    )
  } else if (queryParameters && queryParameters.member) {
    const teamsMembers = await getTeamMemberships(queryParameters.member)
    console.log('got team members', teamsMembers)
    return Promise.all(
      teamsMembers.Items.map(async member => {
        const team = await getTeamById(member.teamId)
        return Object.assign({}, team.Item, { member })
      })
    )
  }
}

const getCoachTeams = username => {
  //TODO: change this full table scan later
  return ddb
    .scan({
      TableName: 'Teams',
      FilterExpression: 'teamOwner = :r',
      ExpressionAttributeValues: { ':r': username },
    })
    .promise()
}

const getTeamMembers = teamId => {
  return ddb
    .scan({
      TableName: 'TeamMembers',
      FilterExpression: 'teamId = :tid',
      ExpressionAttributeValues: { ':tid': teamId },
    })
    .promise()
}

const getTeamMemberships = member => {
  return ddb
    .scan({
      TableName: 'TeamMembers',
      FilterExpression: 'username = :m',
      ExpressionAttributeValues: { ':m': member },
    })
    .promise()
}

const getTeamById = teamId => {
  console.log('fetching team by id', teamId)
  return ddb
    .get({
      TableName: 'Teams',
      Key: {
        teamId: teamId,
      },
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
