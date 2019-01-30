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

export const getApiToken = async () => {
  return (await Auth.currentSession()).idToken.jwtToken;
};

export const fetchAuthorizedUser = dispatch => {
  return Auth.currentUserInfo().then(authUser => {
    let user = {
      avatar: authUser.attributes.picture || "",
      cognitoId: authUser.attributes.sub || "",
      username: authUser.username,
      name: authUser.attributes.name || "",
      email: authUser.attributes.email,
      gender: authUser.attributes.gender || "",
      surname: authUser.attributes["custom:surname"] || "",
      type: authUser.attributes["custom:type"] || "",
      about: authUser.attributes["custom:about"] || "",
      memo: authUser.attributes["custom:memo"] || ""
    };

    return dispatch(loadAuthorizationSuccess(user));
  });
};

export const updateUser = attributes => dispatch => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.updateUserAttributes(user, attributes);
    })
    .then(result => {
      if (result === "SUCCESS") {
        dispatch(fetchAuthorizedUser);
      }
    })
    .catch(err => console.log(err));
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
