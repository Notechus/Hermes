import { LOAD_AUTHORIZATION_SUCCESS } from "reducers/authorizationDataReducer";
import user from "helpers/data/user";

const loadAuthorizationSuccess = user => ({
  type: LOAD_AUTHORIZATION_SUCCESS,
  user
});

export const fetchAuthorizedUser = dispatch => {
  return dispatch(loadAuthorizationSuccess(user));
};
