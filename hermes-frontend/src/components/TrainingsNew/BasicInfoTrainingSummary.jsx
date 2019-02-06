import React from 'react'

import { Col, Row } from 'reactstrap'

import { formatDateAsString } from 'utils/functions'
import ImageAvatarNoUpload from 'components/CustomUpload/ImageAvatarNoUpload.jsx'

const BasicInfoTrainingSummary = ({ username, avatar, userId, trainingDate }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="6">
          <ImageAvatarNoUpload image={avatar} userId={userId} />
        </Col>
        <Col sm="6">
          <h6>Member username: {username}</h6>
          <h6>Training Date: {formatDateAsString(trainingDate)}</h6>
        </Col>
      </Row>
    </>
  )
}

export default BasicInfoTrainingSummary
