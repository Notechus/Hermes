import { combineReducers } from 'redux'
import avatars from 'reducers/entities/avatarsReducer'
import teams from 'reducers/entities/teamsReducer'
import trainings from 'reducers/entities/trainingsReducer'

export default combineReducers({ avatars, teams, trainings })
