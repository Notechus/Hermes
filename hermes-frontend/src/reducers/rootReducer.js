import { combineReducers } from 'redux'
import authorizationData from 'reducers/authorizationDataReducer'
import events from 'reducers/eventsReducer'
import teams from 'reducers/teamsReducer'
import trainings from 'reducers/trainingsReducer'
import webStatistics from 'reducers/webStatisticsReducer'

const rootReducer = combineReducers({
  authorizationData,
  events,
  teams,
  trainings,
  webStatistics,
})

export default rootReducer
