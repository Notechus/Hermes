import React from 'react'
import { connect } from 'react-redux'
import defaultImage from 'assets/img/default-avatar.png'
import { useAvatar } from 'hooks/avatars'
import { getAvatar } from 'reducers/entities/avatarsReducer'
import { fetchAvatar } from 'actions/avatarsActions'

const ImageAvatar = ({ avatar, userId, fetchAvatar }) => {
  useAvatar(avatar, userId, fetchAvatar)
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
  fetchAvatar: userId => dispatch(fetchAvatar(userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ImageAvatar))
