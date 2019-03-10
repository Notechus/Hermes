import { combineReducers } from 'redux'
import authorizationData from 'reducers/authorizationDataReducer'
import entities from 'reducers/entitiesReducer'
import events from 'reducers/eventsReducer'
import notification from 'reducers/notificationsReducer'
import webStatistics from 'reducers/webStatisticsReducer'

const rootReducer = combineReducers({
  authorizationData,
  events,
  entities,
  notification,
  webStatistics,
})

export default rootReducer
