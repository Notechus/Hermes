import React from 'react'
import defaultImage from 'assets/img/default-avatar.png'

const TeamMemberAvatar = ({ image }) => {
  return (
    <div className="picture-container">
      <div className="avatar">
        <img
          src={image ? image : defaultImage}
          className="img-circle img-no-padding img-responsive"
          alt="..."
        />
      </div>
    </div>
  )
}

export default TeamMemberAvatar
