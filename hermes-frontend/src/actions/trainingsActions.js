import {
  LOAD_PAST_TRAININGS_SUCCESS,
  LOAD_CURRENT_WEEK_TRAININGS_SUCCESS,
  UPDATE_TRAINING_SUCCESS
} from "reducers/trainingsReducer";
import { currentWeek, pastTrainings } from "helpers/data/trainings";

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

export const fetchCurrentWeekForUser = username => dispatch => {
  console.log(`fetching tasks for user ${username}`);
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
