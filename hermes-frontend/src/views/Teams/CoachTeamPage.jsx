import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TeamMembersCard from 'components/Teams/TeamMembersCard.jsx'

const CoachTeamPage = ({ team }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={3}>
            <TeamMembersCard members={team.members} />
          </Col>
          <Col md={9}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-left">
                  Details
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p>your team layout here</p>
                <p>your team layout here</p>
                <p>your team layout here</p>
                <p>your team layout here</p>
                <p>your team layout here</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default React.memo(CoachTeamPage)
