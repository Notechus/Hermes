import { NEW_NOTIFICATION } from 'reducers/notificationsReducer'

const newNotification = (message, notificationType) => ({
  type: NEW_NOTIFICATION,
  message,
  notificationType,
})

export const dispatchNotification = (message, type) => dispatch => {
  dispatch(newNotification(message, type))
}
