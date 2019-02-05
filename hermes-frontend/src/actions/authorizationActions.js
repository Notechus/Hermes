import {
  LOAD_AUTHORIZATION_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
} from 'reducers/authorizationDataReducer'
import { Auth, Storage } from 'aws-amplify'

const loadAuthorizationSuccess = user => ({
  type: LOAD_AUTHORIZATION_SUCCESS,
  user,
})

const updateAvatarSuccess = avatar => ({
  type: UPDATE_AVATAR_SUCCESS,
  avatar,
})

export const getApiToken = async () => {
  return (await Auth.currentSession()).idToken.jwtToken
}

export const fetchAuthorizedUser = async dispatch => {
  try {
    const authUser = await Auth.currentAuthenticatedUser()
    const attributes = await Auth.userAttributes(authUser)
    const user = {
      avatar: findAttributeInList(attributes, 'picture') || '',
      cognitoId: authUser.id || '',
      username: authUser.username,
      name: findAttributeInList(attributes, 'name') || '',
      email: findAttributeInList(attributes, 'email'),
      gender: findAttributeInList(attributes, 'gender') || '',
      surname: findAttributeInList(attributes, 'custom:surname') || '',
      type: findAttributeInList(attributes, 'custom:type') || '',
      about: findAttributeInList(attributes, 'custom:about') || '',
      memo: findAttributeInList(attributes, 'custom:memo') || '',
    }

    return dispatch(loadAuthorizationSuccess(user))
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = attributes => async dispatch => {
  try {
    const authUser = await Auth.currentAuthenticatedUser()
    const updateResult = await Auth.updateUserAttributes(authUser, attributes)
    if (updateResult === 'SUCCESS') {
      dispatch(fetchAuthorizedUser)
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateUserAvatar = (name, file) => async dispatch => {
  dispatch(updateAvatarSuccess(''))
  const finalName = name.toLowerCase()
  try {
    const result = await Storage.put(finalName, file, {
      contentType: 'image/png',
      level: 'protected',
    })
    const authUser = await Auth.currentAuthenticatedUser()
    const updateResult = await Auth.updateUserAttributes(authUser, { picture: result.key })
    if (updateResult === 'SUCCESS') {
      return dispatch(updateAvatarSuccess(finalName))
    }
  } catch (err) {
    console.log(err)
  }
  Storage.put(finalName, file, {
    contentType: 'image/png',
    level: 'protected',
  })
    .then(result => {
      return Auth.currentAuthenticatedUser().then(user =>
        Auth.updateUserAttributes(user, { picture: result.key })
      )
    })
    .then(() => {
      return dispatch(updateAvatarSuccess(finalName))
    })
    .catch(err => console.log(err))
}

const findAttributeInList = (list, attr) =>
  list
    .filter(e => e.Name === attr)
    .map(e => e.Value)
    .find(e => e)
