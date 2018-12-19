import { createActionNamespace } from "../utils/actions";

const trainingsAction = createActionNamespace("trainingsAction");

export const LOAD_CURRENT_WEEK_TRAININGS_SUCCESS = trainingsAction(
  "LOAD_CURRENT_WEEK_TRAININGS_SUCCESS"
);
export const UPDATE_TRAINING_SUCCESS = trainingsAction(
  "UPDATE_TRAINING_SUCCESS"
);
export const LOAD_PAST_TRAININGS_SUCCESS = trainingsAction(
  "LOAD_PAST_TRAININGS_SUCCESS"
);
export const REMOVE_TRAININGS_SUCCESS = trainingsAction(
  "REMOVE_TRAININGS_SUCCESS"
);

export const getCurrentWeekTrainings = state => state.trainings.currentWeek;
export const getPastTrainings = state => state.trainings.pastTrainings;

const initialState = {
  currentWeek: [],
  pastTrainings: []
};

const trainingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_WEEK_TRAININGS_SUCCESS:
      return { ...state, currentWeek: action.trainings };
    case LOAD_PAST_TRAININGS_SUCCESS:
      return { ...state, pastTrainings: action.trainings };
    case UPDATE_TRAINING_SUCCESS:
      return {
        ...state,
        currentWeek: [
          ...state.currentWeek.filter(e => e.id !== action.training.id),
          action.training
        ]
      };
    case REMOVE_TRAININGS_SUCCESS:
      return { ...state, currentWeek: [], pastTrainings: [] };
    default:
      return state;
  }
};

export default trainingsReducer;
