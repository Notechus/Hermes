import React from 'react'
import { connect } from 'react-redux'
import NotificationAlert from 'react-notification-alert'
import { getNotification } from 'reducers/notificationsReducer'

class Notifications extends React.PureComponent {
  componentWillReceiveProps(nextProps, nextContext) {
    const { notification } = nextProps
    const options = {
      place: 'tc',
      message: <div>{notification.message}</div>,
      type: notification.type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 5,
    }
    this.refs.notify.notificationAlert(options)
  }

  render() {
    return <NotificationAlert ref="notify" />
  }
}

const mapStateToProps = state => ({
  notification: getNotification(state),
})

export default connect(mapStateToProps)(Notifications)
