import { LOAD_AUTHORIZATION_SUCCESS } from "reducers/authorizationDataReducer";
import user from "helpers/data/user";
import { Auth } from "aws-amplify";

const loadAuthorizationSuccess = user => ({
  type: LOAD_AUTHORIZATION_SUCCESS,
  user
});

export const fetchAuthorizedUser = dispatch => {
  Auth.currentAuthenticatedUser().then(user =>
    console.log("user is", user.attributes)
  );
  return dispatch(loadAuthorizationSuccess(user));
};
