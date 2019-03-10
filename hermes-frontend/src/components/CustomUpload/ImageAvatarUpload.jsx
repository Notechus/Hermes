import React from 'react'
import { connect } from 'react-redux'
import { getAvatar } from 'reducers/entities/avatarsReducer'
import defaultImage from 'assets/img/default-avatar.png'

const ImageAvatarUpload = ({ userId, image, onChange }) => {
  return (
    <div className="picture-container">
      <div className="picture">
        <img src={image ? image : defaultImage} className="picture-src" alt="..." />
        <input type="file" onChange={onChange} />
      </div>
      <h6 className="description">Choose Picture</h6>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  image: getAvatar(state, ownProps.userId),
})

export default connect(mapStateToProps)(React.memo(ImageAvatarUpload))
