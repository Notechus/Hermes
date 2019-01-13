import { createActionNamespace } from "utils/actions";
import { sortByTrainingDateDesc } from "utils/functions";

const trainingsAction = createActionNamespace("trainingsAction");

export const LOAD_TRAININGS_SUCCESS = trainingsAction("LOAD_TRAININGS_SUCCESS");

export const UPDATE_TRAINING_SUCCESS = trainingsAction("UPDATE_TRAINING_SUCCESS");

export const REMOVE_TRAININGS_SUCCESS = trainingsAction("REMOVE_TRAININGS_SUCCESS");

export const CREATE_TRAINING_SUCCESS = trainingsAction("CREATE_TRAINING_SUCCESS");

export const getTrainings = state => state.trainings.trainings;

const initialState = {
  trainings: []
};

const trainingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRAININGS_SUCCESS:
      return { ...state, trainings: action.trainings };
    case UPDATE_TRAINING_SUCCESS:
      const old = state.trainings.filter(e => e.id !== action.training.id);
      return {
        ...state,
        trainings: [...old, action.training].sort(sortByTrainingDateDesc)
      };
    case CREATE_TRAINING_SUCCESS:
      const previous = state.trainings;
      return {
        ...state,
        trainings: [...previous, action.training].sort(sortByTrainingDateDesc)
      };
    case REMOVE_TRAININGS_SUCCESS:
      return { ...state, trainings: [] };
    default:
      return state;
  }
};

export default trainingsReducer;
