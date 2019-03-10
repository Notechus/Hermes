import { NEW_NOTIFICATION } from 'reducers/notificationsReducer'

const newNotification = (message, notificationType) => ({
  type: NEW_NOTIFICATION,
  message,
  notificationType,
})

export const notification = (message, type) => dispatch => {
  dispatch(newNotification(message, type))
}
