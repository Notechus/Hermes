import { LOAD_TEAM_SUCCESS, LOAD_TEAMS_SUCCESS } from 'reducers/teamsReducer'
import { API } from 'aws-amplify'
import { getApiToken } from 'actions/authorizationActions'
import { API_NAME, TEAMS_RESOURCE, USER_TEAM, BASIC_HEADERS } from 'utils/variables'

const loadUserTeamSuccess = team => ({
  type: LOAD_TEAM_SUCCESS,
  team,
})

const loadTeamsSuccess = teams => ({
  type: LOAD_TEAMS_SUCCESS,
  teams,
})

export const fetchUserTeam = username => async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token) }

  try {
    const team = await API.get(API_NAME, USER_TEAM(username), init)
    console.log('team', team)
    if (Object.keys(team).length) {
      return dispatch(loadUserTeamSuccess(team))
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
    return dispatch(loadTeamsSuccess(teams.Items))
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
