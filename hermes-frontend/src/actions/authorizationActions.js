import {
  LOAD_AUTHORIZATION_SUCCESS,
  UPDATE_AVATAR_SUCCESS
} from "reducers/authorizationDataReducer";
import { Auth, Storage } from "aws-amplify";

const loadAuthorizationSuccess = user => ({
  type: LOAD_AUTHORIZATION_SUCCESS,
  user
});

const updateAvatarSuccess = avatar => ({
  type: UPDATE_AVATAR_SUCCESS,
  avatar
});

export const fetchAuthorizedUser = dispatch => {
  return Auth.currentAuthenticatedUser().then(authUser => {
    let user = {
      avatar: authUser.attributes.picture || "",
      cognitoId: authUser.attributes.sub || "",
      username: authUser.username,
      name: authUser.attributes.name || "",
      email: authUser.attributes.email,
      surname: authUser.attributes.surname || "",
      type: authUser.attributes.type || ""
    };
    console.log("user is", authUser);
    console.log("my user is", user);

    return dispatch(loadAuthorizationSuccess(user));
  });
};

export const updateUserAvatar = (name, file) => dispatch => {
  dispatch(updateAvatarSuccess(""));
  const finalName = name.toLowerCase();
  Storage.put(finalName, file, {
    contentType: "image/png",
    level: "protected"
  })
    .then(result => {
      return Auth.currentAuthenticatedUser().then(user =>
        Auth.updateUserAttributes(user, { picture: result.key })
      );
    })
    .then(() => {
      return dispatch(updateAvatarSuccess(finalName));
    })
    .catch(err => console.log(err));
};
