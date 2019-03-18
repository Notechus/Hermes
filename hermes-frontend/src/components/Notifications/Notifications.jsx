import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import NotificationAlert from 'react-notification-alert'
import { getNotification } from 'reducers/notificationsReducer'

const options = (msg, type) => ({
  place: 'tc',
  message: <div>{msg}</div>,
  type: type,
  icon: 'nc-icon nc-bell-55',
  autoDismiss: 5,
})

const Notifications = ({ notification }) => {
  const notify = useRef(null)
  useEffect(
    () => {
      if (notify && Object.keys(notification).length > 0) {
        notify && notify.current.notificationAlert(options(notification.message, notification.type))
      }
    },
    [notification, notify]
  )
  return <NotificationAlert ref={notify} />
}

const mapStateToProps = state => ({
  notification: getNotification(state),
})

export default connect(mapStateToProps)(Notifications)
