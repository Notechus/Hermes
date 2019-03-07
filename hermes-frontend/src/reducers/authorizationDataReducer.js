import { createActionNamespace } from 'utils/actions'
import { combineReducers } from 'redux'
const authorizationDataAction = createActionNamespace('authorizationData')

export const LOAD_AUTHORIZATION_SUCCESS = authorizationDataAction('LOAD_AUTHORIZATION_SUCCESS')
export const REMOVE_AUTHORIZATION_SUCCESS = authorizationDataAction('REMOVE_AUTHORIZATION_SUCCESS')

export const UPDATE_AVATAR_SUCCESS = authorizationDataAction('UPDATE_AVATAR_SUCCESS')

export const getUser = state => state.authorizationData.user

export const EMPTY_USER = {
  username: '',
  userId: '',
  name: '',
  surname: '',
  avatar: '',
  email: '',
  gender: '',
  type: '',
  about: '',
  memo: '',
}

const user = (state = {}, action) => {
  switch (action.type) {
    case LOAD_AUTHORIZATION_SUCCESS:
      return { ...action.user }
    case UPDATE_AVATAR_SUCCESS:
      return { ...state, ...{ avatar: action.avatar } }
    default:
      return state
  }
}

const auth = (state = {}, action) => {}

export default combineReducers({ user })
