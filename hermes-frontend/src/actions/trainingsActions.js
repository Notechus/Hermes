import {
  LOAD_PAST_TRAININGS_SUCCESS,
  LOAD_CURRENT_WEEK_TRAININGS_SUCCESS,
  UPDATE_TRAINING_SUCCESS
} from "reducers/trainingsReducer";
import { currentWeek, pastTrainings } from "helpers/data/trainings";
import { API } from "aws-amplify";
import { getApiToken } from "actions/authorizationActions";
import { API_NAME, TRAININGS_FOR_USER, BASIC_HEADERS } from "utils/variables";

const loadPastTrainings = trainings => ({
  type: LOAD_PAST_TRAININGS_SUCCESS,
  trainings
});

const loadCurrentWeek = trainings => ({
  type: LOAD_CURRENT_WEEK_TRAININGS_SUCCESS,
  trainings
});

const updateTrainingSuccess = training => ({
  type: UPDATE_TRAINING_SUCCESS,
  training
});

export const fetchCurrentWeekForUser = username => async dispatch => {
  const token = await getApiToken();
  console.log(`fetching tasks for user ${username}`);
  try {
    const trainings = await API.get(API_NAME, TRAININGS_FOR_USER(username), {
      headers: BASIC_HEADERS(token)
    });
    console.log("got trainings", trainings);
  } catch (err) {
    console.log("Could not fetch trainings", err);
  }
  return dispatch(loadCurrentWeek(currentWeek));
};

export const updateTraining = training => dispatch => {
  console.log(`updating training ${training}`);
  return dispatch(updateTrainingSuccess(training));
};

export const fetchPastTrainingsForUser = (username, page) => dispatch => {
  console.log(`fetching tasks page ${page} for user ${username}`);
  return dispatch(loadPastTrainings(pastTrainings));
};
