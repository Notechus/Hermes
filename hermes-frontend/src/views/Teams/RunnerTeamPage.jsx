import React from 'react'
import moment from 'moment'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TeamCoachCard from 'components/Teams/TeamCoachCard.jsx'

const RunnerTeamPage = ({ team, leave }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={4}>
            <TeamCoachCard description={team.description} owner={team.teamOwner} />
          </Col>
          <Col md={8}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-center">
                  {team.teamName}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <p className="text-muted card-category">
                      Members: <b>1</b>
                    </p>
                  </Col>
                  <Col md={7} />
                  <Col md={1}>
                    <a href="#pablo" onClick={e => e.preventDefault()} className="ml-auto">
                      Leave
                    </a>
                  </Col>
                </Row>
                <hr />
                <pre>
                  Personal note: {'\n'}
                  {team.coachNote}
                </pre>
              </CardBody>
              <CardFooter>
                <hr />
                <h6 className="card-category">Joined: {moment(team.joinedAt).fromNow()}</h6>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default RunnerTeamPage
