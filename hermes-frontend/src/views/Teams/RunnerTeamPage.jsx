import React from 'react'
import moment from 'moment'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { DATETIME_FORMAT } from 'utils/functions'
import ImageAvatarNoUpload from 'components/CustomUpload/ImageAvatarNoUpload.jsx'

const RunnerTeamPage = ({ team, leave }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={4}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-center">
                  Coach
                </CardTitle>
              </CardHeader>
              <CardBody className="text-center">
                <div className="icon icon-primary">
                  <i className="fa fa-quote-right" />
                </div>
                <p className="card-description">{team.description}</p>
              </CardBody>
              <CardFooter className="text-center">
                <ImageAvatarNoUpload />
                <h6 className="card-category">@{team.teamOwner}</h6>
              </CardFooter>
            </Card>
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
                    <p className="text-muted">
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
                {/*{team.coachNote.split('\n').map((prop, key) => <p key={key}>{prop}</p>)}*/}
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
