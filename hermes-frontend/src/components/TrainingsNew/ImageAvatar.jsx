import React from 'react'
import defaultImage from 'assets/img/default-avatar.png'

const ImageAvatar = ({ src }) => {
  return (
    <div className="picture-container">
      <div className="picture">
        {src ? (
          <img src={src} className="picture-src" alt="..." />
        ) : (
          <img src={defaultImage} className="picture-src" alt="..." />
        )}
      </div>
    </div>
  )
}

export default ImageAvatar
