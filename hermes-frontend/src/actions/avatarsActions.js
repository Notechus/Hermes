import { LOAD_AVATAR_SUCCESS } from 'reducers/entities/avatarsReducer'
import { Storage } from 'aws-amplify'

const AVATAR_SUFFIX = '-avatar.png'

const loadedAvatar = (userId, avatar) => ({
  type: LOAD_AVATAR_SUCCESS,
  userId,
  avatar,
})

export const fetchUserAvatar = (username, userId) => async dispatch => {
  try {
    const avatar = await Storage.get(`${username}${AVATAR_SUFFIX}`, {
      level: 'protected',
      identityId: userId,
    })
    console.log('avatar', avatar)
    dispatch(loadedAvatar(userId, avatar))
  } catch (err) {
    console.log('Could not fetch team', err)
  }
}

export const fetchAvatar = (username, userId) => async dispatch => {
  try {
    const avatar = await Storage.get(`${username}${AVATAR_SUFFIX}`, {
      level: 'private',
    })
    console.log('avatar', avatar)
    dispatch(loadedAvatar(userId, avatar))
  } catch (err) {
    console.log('Could not fetch teams', err)
  }
}
