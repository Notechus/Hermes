import React from 'react'
import { S3Image } from 'aws-amplify-react'
import defaultImage from 'assets/img/default-avatar.png'

const ImageAvatarNoUpload = ({ image, userId }) => {
  return (
    <div className="picture-container">
      <div className="picture">
        {image ? (
          <S3Image imgKey={image} level="protected" identityId={userId} className="picture-src" />
        ) : (
          <img src={defaultImage} className="picture-src" alt="..." />
        )}
      </div>
    </div>
  )
}

export default ImageAvatarNoUpload
