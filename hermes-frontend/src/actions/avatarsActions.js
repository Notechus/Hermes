import { LOAD_AVATAR_SUCCESS } from 'reducers/entities/avatarsReducer'
import { Storage } from 'aws-amplify'

const AVATAR_SUFFIX = '-avatar.png'

const loadedAvatar = (userId, avatar) => ({
  type: LOAD_AVATAR_SUCCESS,
  userId,
  avatar,
})

export const fetchAvatar = (username, userId) => async dispatch => {
  try {
    const key = `${username.toLowerCase()}${AVATAR_SUFFIX}`
    const avatar = await Storage.get(key, {
      level: 'protected',
      identityId: userId,
    })
    const result = await fetch(avatar, { method: 'GET', mode: 'cors' })
    console.log('avatar', avatar)
    if (result.ok) {
      dispatch(loadedAvatar(userId, avatar))
    }
  } catch (err) {
    console.log('Could not fetch avatar', err)
  }
}
