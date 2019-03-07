import { combineReducers } from 'redux'
import teams from 'reducers/entities/teamsReducer'
import trainings from 'reducers/entities/trainingsReducer'

export default combineReducers({ teams, trainings })
