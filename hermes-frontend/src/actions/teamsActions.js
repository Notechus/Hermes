import { LOAD_TEAM_SUCCESS, LOAD_TEAMS_SUCCESS } from 'reducers/entities/teamsReducer'
import { API } from 'aws-amplify'
import { getApiToken } from 'actions/authorizationActions'
import { API_NAME, TEAMS_RESOURCE, BASIC_HEADERS } from 'utils/variables'

const loadUserTeamSuccess = team => ({
  type: LOAD_TEAM_SUCCESS,
  team,
})

const loadTeamsSuccess = teams => ({
  type: LOAD_TEAMS_SUCCESS,
  teams,
})

export const fetchUserTeam = (username, userType) => async dispatch => {
  const token = await getApiToken()
  const init = {
    headers: BASIC_HEADERS(token),
    queryStringParameters: {},
  }

  if (userType === 'Coach') {
    init.queryStringParameters.owner = username
  } else if (userType === 'Member') {
    init.queryStringParameters.member = username
  }

  try {
    const team = await API.get(API_NAME, TEAMS_RESOURCE, init)
    console.log('team', team)
    if (Object.keys(team).length) {
      return dispatch(loadUserTeamSuccess(team[0]))
    }
  } catch (err) {
    console.log('Could not fetch team', err)
  }
}

export const fetchTeams = async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token) }

  console.log(`fetching teams`)
  try {
    const teams = await API.get(API_NAME, TEAMS_RESOURCE, init)
    console.log('fetched teams', teams)
    return dispatch(loadTeamsSuccess(teams))
  } catch (err) {
    console.log('Could not fetch teams', err)
  }
}

export const joinTeam = (username, userId, joinCode) => async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token), body: { userId, username, joinCode } }

  console.log('joining team using code', joinCode)
  try {
    const response = await API.put(API_NAME, TEAMS_RESOURCE, init)
    console.log('got response from join', response)
    return dispatch(fetchUserTeam(username))
  } catch (err) {
    console.log('Could not join team', err)
  }
}
