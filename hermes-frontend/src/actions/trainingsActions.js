import moment from 'moment'
import { API } from 'aws-amplify'
import {
  LOAD_TRAININGS_SUCCESS,
  UPDATE_TRAINING_SUCCESS,
  CREATE_TRAINING_SUCCESS,
  REMOVE_TRAINING_SUCCESS,
} from 'reducers/trainingsReducer'
import { getApiToken } from 'actions/authorizationActions'
import { API_NAME, TRAININGS_FOR_USER, TRAININGS_RESOURCE, BASIC_HEADERS } from 'utils/variables'
import { updateStatistics } from 'actions/webStatisticsActions'
import { DATETIME_FORMAT } from 'utils/functions'

const loadTrainingsSuccess = trainings => ({
  type: LOAD_TRAININGS_SUCCESS,
  trainings,
})

const updateTrainingSuccess = training => ({
  type: UPDATE_TRAINING_SUCCESS,
  training,
})

const createTrainingSuccess = training => ({
  type: CREATE_TRAINING_SUCCESS,
  training,
})

const removeTrainingSuccess = trainingId => ({
  type: REMOVE_TRAINING_SUCCESS,
  trainingId,
})

export const createNewTraining = training => async dispatch => {
  const token = await getApiToken()
  const init = {
    headers: BASIC_HEADERS(token),
    body: training,
  }
  console.log('creating training', training)
  const result = await API.post(API_NAME, TRAININGS_RESOURCE, init)
  console.log(result)
  return dispatch(createTrainingSuccess(result))
}

export const fetchTrainingsForUser = username => async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token) }

  try {
    const trainings = await API.get(API_NAME, TRAININGS_FOR_USER(username), init)
    dispatch(updateStatistics('LOAD_USER_TRAININGS', moment().format(DATETIME_FORMAT)))
    return dispatch(loadTrainingsSuccess(trainings.Items))
  } catch (err) {
    console.log('Could not fetch trainings', err)
  }
}

export const updateTraining = training => async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token), body: training }

  console.log(`updating training ${training}`)
  try {
    const response = await API.put(API_NAME, TRAININGS_RESOURCE, init)
    console.log('got response after update', response)
    return dispatch(updateTrainingSuccess(training))
  } catch (err) {
    console.log('Could not update training', err)
  }
}

export const removeTraining = training => async dispatch => {
  const token = await getApiToken()
  const init = { headers: BASIC_HEADERS(token), body: {} }

  console.log(`removing training ${training}`)
  try {
    const response = await API.del(API_NAME, TRAININGS_RESOURCE, init)
    console.log('got response after removal', response)
    return dispatch(removeTrainingSuccess(training.trainingId))
  } catch (err) {
    console.log('Could not remove training', err)
  }
}
