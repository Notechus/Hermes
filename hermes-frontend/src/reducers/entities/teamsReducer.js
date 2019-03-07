import { createActionNamespace } from 'utils/actions'
import { keyBy } from 'lodash'
import { combineReducers } from 'redux'

const trainingsAction = createActionNamespace('teamsAction')

export const LOAD_TEAM_SUCCESS = trainingsAction('LOAD_TEAM_SUCCESS')
export const LOAD_TEAMS_SUCCESS = trainingsAction('LOAD_TEAMS_SUCCESS')

export const getTeam = (state, id) => state.entities.teams.byId[id]
export const getTeams = state => state.entities.teams.allIds.map(id => getTeam(state, id))

const byId = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TEAM_SUCCESS:
      return { ...state, [action.team.teamId]: Object.assign({}, action.team, { entities: {} }) }
    case LOAD_TEAMS_SUCCESS:
      return { ...state, ...keyBy(action.teams, e => e.teamId) }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case LOAD_TEAM_SUCCESS:
      return [...new Set([...state, action.team.teamId])]
    case LOAD_TEAMS_SUCCESS:
      return [...new Set([...state, ...action.teams.map(e => e.teamId)])]
    default:
      return state
  }
}

export default combineReducers({ byId, allIds })
