import { createActionNamespace } from 'utils/actions'
import {
  sortByTrainingDateAsc,
  sortByTrainingDateDesc,
  getCurrentMonthBoundaries,
  isDateInRange,
} from 'utils/functions'
import moment from 'moment'

const trainingsAction = createActionNamespace('trainingsAction')

export const LOAD_TRAININGS_SUCCESS = trainingsAction('LOAD_TRAININGS_SUCCESS')

export const UPDATE_TRAINING_SUCCESS = trainingsAction('UPDATE_TRAINING_SUCCESS')

export const REMOVE_TRAININGS_SUCCESS = trainingsAction('REMOVE_TRAININGS_SUCCESS')

export const REMOVE_TRAINING_SUCCESS = trainingsAction('REMOVE_TRAINING_SUCCESS')

export const CREATE_TRAINING_SUCCESS = trainingsAction('CREATE_TRAINING_SUCCESS')

export const getTrainings = state => state.trainings.trainings
export const getCurrentMonthTrainings = state => {
  const [start, end] = getCurrentMonthBoundaries()
  return state.trainings.trainings.filter(e =>
    moment(e.trainingDate).isBetween(start, end, null, '[]')
  )
}
export const getNextTraining = state => {
  const now = moment()
  return state.trainings.trainings
    .filter(e => !e.completed && moment(e.trainingDate).isSameOrAfter(now, 'day'))
    .sort(sortByTrainingDateDesc)
    .find(e => e)
}
export const getPreviousTraining = state => {
  const now = moment()
  return state.trainings.trainings
    .filter(e => e.completed && moment(e.trainingDate).isSameOrBefore(now, 'day'))
    .sort(sortByTrainingDateAsc)
    .find(e => e)
}

export const getCurrentWeekTrainings = state => {
  const startWeek = moment().startOf('isoWeek')
  const endWeek = moment().endOf('isoWeek')
  return state.trainings.trainings.filter(training =>
    isDateInRange(training.trainingDate, startWeek, endWeek)
  )
}

export const getTrainingsExceptCurrentWeek = state => {
  const startWeek = moment().startOf('isoWeek')
  const endWeek = moment().endOf('isoWeek')
  return state.trainings.trainings.filter(
    training => !isDateInRange(training.trainingDate, startWeek, endWeek)
  )
}

const initialState = {
  trainings: [],
}

const trainingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRAININGS_SUCCESS:
      return { ...state, trainings: action.trainings }
    case UPDATE_TRAINING_SUCCESS:
      const old = state.trainings.filter(e => e.trainingId !== action.training.trainingId)
      return {
        ...state,
        trainings: [...old, action.training].sort(sortByTrainingDateDesc),
      }
    case CREATE_TRAINING_SUCCESS:
      const previous = state.trainings
      return {
        ...state,
        trainings: [...previous, action.training].sort(sortByTrainingDateDesc),
      }
    case REMOVE_TRAINING_SUCCESS:
      const trainings = state.trainings.filter(e => e.trainingId !== action.trainingId)
      return { ...state, trainings: trainings }
    case REMOVE_TRAININGS_SUCCESS:
      return { ...state, trainings: [] }
    default:
      return state
  }
}

export default trainingsReducer
