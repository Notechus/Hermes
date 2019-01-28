import { combineReducers } from "redux";
import authorizationData from "reducers/authorizationDataReducer";
import trainings from "reducers/trainingsReducer";
import webStatistics from "reducers/webStatisticsReducer";

const rootReducer = combineReducers({
  authorizationData,
  trainings,
  webStatistics
});

export default rootReducer;
