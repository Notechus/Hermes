import React from 'react'

import { Col, Row } from 'reactstrap'

import { formatDateAsString } from 'utils/functions'
import ImageAvatar from 'components/TrainingsNew/ImageAvatar.jsx'

const BasicInfoTrainingSummary = ({ username, avatar, description, trainingDate }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="6">
          <ImageAvatar src={avatar} />
        </Col>
        <Col sm="6">
          <h6>Member username: {username}</h6>
          <h6>Training Date: {formatDateAsString(trainingDate)}</h6>
          <h6>Description: {description}</h6>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(BasicInfoTrainingSummary)
