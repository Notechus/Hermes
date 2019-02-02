import { createActionNamespace } from 'utils/actions'
import { sortByNameDesc } from 'utils/functions'

const trainingsAction = createActionNamespace('teamsAction')

export const LOAD_TEAM_SUCCESS = trainingsAction('LOAD_TEAM_SUCCESS')

export const LOAD_TEAMS_SUCCESS = trainingsAction('LOAD_TEAMS_SUCCESS')

export const getTeam = state => state.teams.team
export const getTeams = state => state.teams.teams

const initialState = {
  team: {},
  teams: [],
}

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAM_SUCCESS:
      return { ...state, team: action.team }
    case LOAD_TEAMS_SUCCESS:
      return { ...state, teams: action.teams.sort(sortByNameDesc) }
    default:
      return state
  }
}

export default teamsReducer
