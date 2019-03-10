import React from 'react'
import { connect } from 'react-redux'
import defaultImage from 'assets/img/default-avatar.png'
import { useAvatar } from 'hooks/avatars'
import { getAvatar } from 'reducers/entities/avatarsReducer'
import { fetchAvatar } from 'actions/avatarsActions'

const ImageAvatar = ({ avatar, userId, username, fetchAvatar }) => {
  useAvatar(avatar, username, userId, fetchAvatar)
  return (
    <div className="picture-container">
      <div className="picture">
        <img src={avatar ? avatar : defaultImage} className="picture-src" alt="..." />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  avatar: getAvatar(state, ownProps.userId),
})

const mapDispatchToProps = dispatch => ({
  fetchAvatar: (username, userId) => dispatch(fetchAvatar(username, userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ImageAvatar))
