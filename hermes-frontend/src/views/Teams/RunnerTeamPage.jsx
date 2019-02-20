import React from 'react'
import moment from 'moment'
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import TeamCoachCard from 'components/Teams/TeamCoachCard.jsx'

const RunnerTeamPage = ({ team, leave }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={4}>
            <TeamCoachCard
              name={team.teamName}
              description={team.description}
              owner={team.teamOwner}
            />
          </Col>
          <Col md={8}>
            <Card>
              <CardHeader />
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
                <p>Personal note: </p>
                <hr />
                <pre>{team.member ? team.member.coachNote : ''}</pre>
              </CardBody>
              <CardFooter>
                <hr />
                <h6 className="card-category">
                  Joined: {moment(team.member ? team.member.joinedAt : '').fromNow()}
                </h6>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default React.memo(RunnerTeamPage)
