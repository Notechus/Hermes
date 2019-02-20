import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import moment from 'moment'
import TeamMemberAvatar from 'components/Teams/Coach/TeamMemberAvatar.jsx'

const TeamMemberListCell = ({ member, click }) => {
  return (
    <>
      <Row>
        <Col md="2" xs="2">
          <TeamMemberAvatar image={member.username} userId={member.userId} />
        </Col>
        <Col md="7" xs="7">
          {member.username} <br />
          <span className="text-muted">
            <small>{moment(member.joinedAt).fromNow(true)}</small>
          </span>
        </Col>
        <Col className="text-right" md="3" xs="3">
          <Button className="btn-round btn-icon" color="info" outline size="sm" onClick={click}>
            <i className="nc-icon nc-minimal-right" />
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(TeamMemberListCell)
