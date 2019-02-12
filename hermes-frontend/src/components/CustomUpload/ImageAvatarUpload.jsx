import React from 'react'
import { S3Image } from 'aws-amplify-react'
import defaultImage from 'assets/img/default-avatar.png'

const ImageAvatarUpload = ({ loaded, image, onChange }) => {
  return (
    <div className="picture-container">
      <div className="picture">
        {loaded ? (
          <S3Image imgKey={image} level="protected" className="picture-src" />
        ) : (
          <img src={defaultImage} className="picture-src" alt="..." />
        )}
        <input type="file" onChange={e => onChange(e)} />
      </div>
      <h6 className="description">Choose Picture</h6>
    </div>
  )
}

export default React.memo(ImageAvatarUpload)
