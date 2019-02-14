import React from 'react'
import { Card, CardBody, Col, Row, Button } from 'reactstrap'
import TeamCoachCard from 'components/Teams/TeamCoachCard'

const TeamDetailsJoinView = ({ team, join }) => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={4}>
            <TeamCoachCard description={team.description} owner={team.teamOwner} />
          </Col>
          <Col md={8}>
            <h4 className="text-left">Details</h4>
            <div>
              <p>Members: {team.members ? team.members.length : 0}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={1} className="ml-auto mr-2">
            <Button className="btn-round" color="default" onClick={join}>
              Join
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default React.memo(TeamDetailsJoinView)
