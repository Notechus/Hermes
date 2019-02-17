import React from 'react'
import moment from 'moment'
import { Row, Col } from 'reactstrap'

const TeamMemberDetailsView = ({ joinedAt, note, username }) => {
  return (
    <div className="text-left content">
      <Row>
        <Col md={6}>
          <h6 className="text-center">{username}</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Coach note: </p>
          <pre>{note}</pre>
        </Col>
      </Row>
      <hr />
      <h6 className="card-category">Joined: {moment(joinedAt).fromNow()}</h6>
    </div>
  )
}

export default React.memo(TeamMemberDetailsView)
