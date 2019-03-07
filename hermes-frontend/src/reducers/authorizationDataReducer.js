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

const initialState = {
  user: EMPTY_USER,
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

const authorizationDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AUTHORIZATION_SUCCESS:
      return { ...state, user: action.user }
    case REMOVE_AUTHORIZATION_SUCCESS:
      return { ...state, user: EMPTY_USER }
    case UPDATE_AVATAR_SUCCESS:
      const user = Object.assign({}, state.user, { avatar: action.avatar })
      return { ...state, user }
    default:
      return state
  }
}

export default combineReducers({ user })
