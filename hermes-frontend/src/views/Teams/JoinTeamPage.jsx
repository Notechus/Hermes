import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap'

const JoinTeamPage = ({ teams }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-left">
                  Join a team
                </CardTitle>
                <CardBody>here autocomplete form</CardBody>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default JoinTeamPage
