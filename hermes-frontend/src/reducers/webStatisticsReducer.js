import { createActionNamespace } from "utils/actions";

const webStatisticsAction = createActionNamespace("webStatisticsAction");

export const UPDATE_STATISTICS_SUCCESS = webStatisticsAction("UPDATE_STATISTICS_SUCCESS");

export const getWebStatistic = (state, name) => state.webStatistics[name];

const initialState = {};

const webStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATISTICS_SUCCESS:
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

export default webStatisticsReducer;
