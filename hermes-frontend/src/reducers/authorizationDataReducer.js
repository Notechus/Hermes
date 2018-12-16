import { createActionNamespace } from "../utils/actions";

const authorizationDataAction = createActionNamespace("authorizationData");

export const LOAD_AUTHORIZATION_SUCCESS = authorizationDataAction(
  "LOAD_AUTHORIZATION_SUCCESS"
);
export const REMOVE_AUTHORIZATION_SUCCESS = authorizationDataAction(
  "REMOVE_AUTHORIZATION_SUCCESS"
);

export const getUser = state => state.authorizationData.user;
export const getToken = state => state.authorizationData.token;

const initialState = {
  user: null,
  token: ""
};

const authorizationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AUTHORIZATION_SUCCESS:
      return { ...state, user: action.user };
    case REMOVE_AUTHORIZATION_SUCCESS:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authorizationDataReducer;
