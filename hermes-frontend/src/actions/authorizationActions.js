import { LOAD_AUTHORIZATION_SUCCESS, UPDATE_USER_SUCCESS } from 'reducers/authorizationDataReducer'
import { Auth, API, Storage } from 'aws-amplify'
import { API_NAME, USER_BY_ID, BASIC_HEADERS } from 'utils/variables'
import { fetchAvatar } from 'actions/avatarsActions'
import { fetchTrainingsForUser } from 'actions/trainingsActions'
import { fetchUserTeam } from 'actions/teamsActions'
import { notification } from 'actions/notificationsActions'

const loadAuthorizationSuccess = user => ({
  type: LOAD_AUTHORIZATION_SUCCESS,
  user,
})

const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  user,
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
    dispatch(loadUserRelatedData(user.userId, user.username, user.type))
    return dispatch(loadAuthorizationSuccess(user))
  } catch (err) {
    console.log(err)
  }
}

export const loadUserRelatedData = (userId, username, userType) => async dispatch => {
  dispatch(fetchAvatar(userId))
  dispatch(fetchTrainingsForUser(username))
  dispatch(fetchUserTeam(username, userType))
}

export const updateUser = attributes => async dispatch => {
  try {
    const authUser = await Auth.currentAuthenticatedUser()
    const token = await getApiToken()
    const response = await API.put(API_NAME, USER_BY_ID(authUser.username), {
      headers: BASIC_HEADERS(token),
      body: attributes,
    })
    console.log('got response after update', response)
    dispatch(notification('You have successfully updated your profile', 'success'))
    return dispatch(updateUserSuccess(attributes))
  } catch (err) {
    console.log(err)
  }
}

export const updateUserAvatar = (userId, file) => async dispatch => {
  try {
    const result = await Storage.put(userId + '.png', file, {
      contentType: 'image/png',
      level: 'protected',
    })
    console.log('got response after update', result)
    dispatch(notification('You have successfully updated your profile', 'success'))
    return dispatch(fetchAvatar(userId))
  } catch (err) {
    console.log(err)
  }
}
