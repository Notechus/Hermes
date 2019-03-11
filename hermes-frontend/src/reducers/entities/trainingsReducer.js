import { createActionNamespace } from 'utils/actions'
import {
  sortByTrainingDateAsc,
  sortByTrainingDateDesc,
  getCurrentMonthBoundaries,
  isDateInRange,
  getYearInterval,
  getToday,
} from 'utils/functions'
import moment from 'moment'
import { keyBy, omit } from 'lodash'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

const trainingsAction = createActionNamespace('trainingsAction')

export const LOAD_TRAININGS_SUCCESS = trainingsAction('LOAD_TRAININGS_SUCCESS')
export const UPDATE_TRAINING_SUCCESS = trainingsAction('UPDATE_TRAINING_SUCCESS')
export const REMOVE_TRAININGS_SUCCESS = trainingsAction('REMOVE_TRAININGS_SUCCESS')
export const REMOVE_TRAINING_SUCCESS = trainingsAction('REMOVE_TRAINING_SUCCESS')
export const CREATE_TRAINING_SUCCESS = trainingsAction('CREATE_TRAINING_SUCCESS')

export const getTraining = (state, id) => state.entities.trainings.byId[id]

export const getTrainingIds = state => state.entities.trainings.allIds

export const getTrainings = state =>
  state.entities.trainings.allIds.map(id => getTraining(state, id))

export const getCurrentMonthTrainingsSelect = () =>
  createSelector(
    [getTrainings],
    trainings => {
      const [start, end] = getCurrentMonthBoundaries()
      return trainings.filter(e => moment(e.trainingDate).isBetween(start, end, null, '[]'))
    }
  )

export const getNextTrainingSelect = () =>
  createSelector(
    [getTrainings],
    trainings => {
      const today = getToday()
      return trainings
        .filter(e => !e.completed && moment(e.trainingDate).isSameOrAfter(today, 'day'))
        .sort(sortByTrainingDateDesc)
        .find(e => e)
    }
  )

export const getPreviousTrainingSelect = () =>
  createSelector(
    [getTrainings],
    trainings => {
      const today = getToday()
      return trainings
        .filter(e => e.completed && moment(e.trainingDate).isSameOrBefore(today, 'day'))
        .sort(sortByTrainingDateAsc)
        .find(e => e)
    }
  )

export const getCurrentWeekTrainings = state => {
  const startWeek = moment().startOf('isoWeek')
  const endWeek = moment().endOf('isoWeek')
  return getTrainings(state).filter(training =>
    isDateInRange(training.trainingDate, startWeek, endWeek)
  )
}

export const getCurrentWeekTrainingIdsSelect = () =>
  createSelector(
    [getTrainings],
    trainings => {
      const startWeek = moment().startOf('isoWeek')
      const endWeek = moment().endOf('isoWeek')
      return trainings
        .filter(training => isDateInRange(training.trainingDate, startWeek, endWeek))
        .sort(sortByTrainingDateDesc)
        .map(e => e.trainingId)
    }
  )

export const getTrainingIdsExceptCurrentWeekSelect = () =>
  createSelector(
    [getTrainings],
    trainings => {
      const startWeek = moment().startOf('isoWeek')
      const endWeek = moment().endOf('isoWeek')
      return trainings
        .filter(training => !isDateInRange(training.trainingDate, startWeek, endWeek))
        .sort(sortByTrainingDateDesc)
        .map(e => e.trainingId)
    }
  )

export const getTrainingsExceptCurrentWeek = state => {
  const startWeek = moment().startOf('isoWeek')
  const endWeek = moment().endOf('isoWeek')
  return getTrainings(state).filter(
    training => !isDateInRange(training.trainingDate, startWeek, endWeek)
  )
}

export const getLastYearOfTrainings = state => {
  const [start, end] = getYearInterval()
  return getTrainings(state).filter(training =>
    moment(training.trainingDate).isBetween(start, end, null, '[]')
  )
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TRAININGS_SUCCESS:
      return { ...keyBy(action.trainings, e => e.trainingId) }
    case UPDATE_TRAINING_SUCCESS:
      return { ...state, [action.training.trainingId]: action.training }
    case CREATE_TRAINING_SUCCESS:
      return { ...state, [action.training.trainingId]: action.training }
    case REMOVE_TRAINING_SUCCESS:
      return omit(state, action.trainingId)
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case LOAD_TRAININGS_SUCCESS:
      return [...new Set([...action.trainings.map(e => e.trainingId)])]
    case UPDATE_TRAINING_SUCCESS:
      return state
    case CREATE_TRAINING_SUCCESS:
      return [...state, action.training.trainingId]
    case REMOVE_TRAINING_SUCCESS:
      return state.filter(e => e.trainingId !== action.trainingId)
    default:
      return state
  }
}

export default combineReducers({ byId, allIds })
