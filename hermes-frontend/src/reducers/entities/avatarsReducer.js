import { createActionNamespace } from 'utils/actions'

const avatarActions = createActionNamespace('avatarsActions')

export const LOAD_AVATAR_SUCCESS = avatarActions('LOAD_AVATAR_SUCCESS')
export const UPDATE_AVATAR_SUCCESS = avatarActions('UPDATE_AVATAR_SUCCESS')

export const getAvatar = (state, id) => state.entities.avatars[id]

const avatars = (state = {}, action) => {
  switch (action.type) {
    case LOAD_AVATAR_SUCCESS:
      return { ...state, [action.userId]: action.avatar }
    default:
      return state
  }
}

export default avatars
