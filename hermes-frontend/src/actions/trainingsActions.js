import {
  LOAD_TRAININGS_SUCCESS,
  UPDATE_TRAINING_SUCCESS,
  CREATE_TRAINING_SUCCESS
} from "reducers/trainingsReducer";
import { API } from "aws-amplify";
import { getApiToken } from "actions/authorizationActions";
import { API_NAME, TRAININGS_FOR_USER, TRAININGS_RESOURCE, BASIC_HEADERS } from "utils/variables";

const loadTrainingsSuccess = trainings => ({
  type: LOAD_TRAININGS_SUCCESS,
  trainings
});

const updateTrainingSuccess = training => ({
  type: UPDATE_TRAINING_SUCCESS,
  training
});

const createTrainingSuccess = training => ({
  type: CREATE_TRAINING_SUCCESS,
  training
});

export const createNewTraining = training => async dispatch => {
  const token = await getApiToken();
  const init = {
    headers: BASIC_HEADERS(token),
    body: training
  };
  console.log("creating training", training);
  const result = await API.post(API_NAME, TRAININGS_RESOURCE, init);
  console.log(result);
  return dispatch(createTrainingSuccess(result));
};

export const fetchTrainingsForUser = username => async dispatch => {
  const token = await getApiToken();
  const init = { headers: BASIC_HEADERS(token) };

  console.log(`fetching tasks for user ${username}`);
  try {
    const trainings = await API.get(API_NAME, TRAININGS_FOR_USER(username), init);
    console.log("got trainings", trainings);
    return dispatch(loadTrainingsSuccess(trainings.Items));
  } catch (err) {
    console.log("Could not fetch trainings", err);
  }
};

export const updateTraining = training => async dispatch => {
  const token = await getApiToken();
  const init = { headers: BASIC_HEADERS(token), body: training };

  console.log(`updating training ${training}`);
  try {
    const response = await API.put(API_NAME, TRAININGS_RESOURCE, init);
    console.log("got response after update", response);
    return dispatch(updateTrainingSuccess(training));
  } catch (err) {
    console.log("Could not update training", err);
  }
};
