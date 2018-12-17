import { combineReducers } from "redux";
import authorizationData from "reducers/authorizationDataReducer";
import trainings from "reducers/trainingsReducer";

const rootReducer = combineReducers({
  authorizationData,
  trainings
});

export default rootReducer;
