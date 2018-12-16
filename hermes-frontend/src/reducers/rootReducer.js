import { combineReducers } from "redux";
import authorizationData from "reducers/authorizationDataReducer";

const rootReducer = combineReducers({ authorizationData });

export default rootReducer;
