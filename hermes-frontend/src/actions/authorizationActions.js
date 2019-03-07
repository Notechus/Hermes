import {
  LOAD_AUTHORIZATION_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
} from 'reducers/authorizationDataReducer'
import { Auth, API, Storage } from 'aws-amplify'
import { API_NAME, USER_BY_ID, BASIC_HEADERS } from 'utils/variables'
import { fetchUserAvatar } from 'actions/avatarsActions'

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
    const token = await getApiToken()
    const userProfile = await API.get(API_NAME, USER_BY_ID(authUser.username), {
      headers: BASIC_HEADERS(token),
    })
    const user = {
      avatar: userProfile.avatar || '',
      userId: userProfile.userId || '',
      username: authUser.username,
      name: userProfile.name || '',
      email: userProfile.email,
      gender: userProfile.gender || '',
      surname: userProfile.surname || '',
      type: userProfile.type || '',
      about: userProfile.about || '',
      memo: userProfile.memo || '',
      teamId: userProfile.teamId || '',
    }
    dispatch(fetchUserAvatar(user.username, user.userId))
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
