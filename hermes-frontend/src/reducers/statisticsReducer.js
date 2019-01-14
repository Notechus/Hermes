import { createActionNamespace } from "utils/actions";
import { sortByTrainingDateDesc } from "utils/functions";

const statisticsAction = createActionNamespace("statisticsAction");

export const LOAD_STATISTICS_SUCCESS = statisticsAction("LOAD_STATISTICS_SUCCESS");

export const getStatistics = state => state.statistics.statistics;

const initialState = {
  statistics: {}
};

const trainingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRAININGS_SUCCESS:
      return { ...state, trainings: action.trainings };
    case UPDATE_TRAINING_SUCCESS:
      const old = state.trainings.filter(e => e.trainingId !== action.training.trainingId);
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
