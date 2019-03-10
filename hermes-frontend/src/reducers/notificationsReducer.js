import { createActionNamespace } from 'utils/actions'

const trainingsAction = createActionNamespace('toasts')

export const NEW_NOTIFICATION = trainingsAction('NEW_NOTIFICATION')

export const getNotification = state => state.notification

const notificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_NOTIFICATION:
      return { message: action.message, type: action.notificationType }
    default:
      return state
  }
}

export default notificationsReducer
