import React from 'react'
import { S3Image } from 'aws-amplify-react'
import defaultImage from 'assets/img/default-avatar.png'

const AVATAR_SUFFIX = '-avatar.png'

const TeamMemberAvatar = ({ image, userId }) => {
  return (
    <div className="picture-container">
      <div className="avatar">
        {image ? (
          <S3Image
            imgKey={image.toLowerCase() + AVATAR_SUFFIX}
            level="protected"
            identityId={userId}
            className="img-circle img-no-padding img-responsive"
          />
        ) : (
          <img src={defaultImage} className="img-circle img-no-padding img-responsive" alt="..." />
        )}
      </div>
    </div>
  )
}

export default TeamMemberAvatar
