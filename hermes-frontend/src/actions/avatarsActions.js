import { LOAD_AVATAR_SUCCESS } from 'reducers/entities/avatarsReducer'
import { Storage } from 'aws-amplify'

const AVATAR_SUFFIX = '.png'

const loadedAvatar = (userId, avatar) => ({
  type: LOAD_AVATAR_SUCCESS,
  userId,
  avatar,
})

export const fetchAvatar = userId => async dispatch => {
  try {
    const avatar = await Storage.get(userId + AVATAR_SUFFIX, {
      level: 'protected',
      identityId: userId,
    })
    const result = await fetch(avatar, { method: 'GET', mode: 'cors' })
    if (result.ok) {
      dispatch(loadedAvatar(userId, avatar))
    }
  } catch (err) {
    console.log('Could not fetch avatar', err)
  }
}
