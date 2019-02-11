import React from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from 'reactstrap'

const SingleTrainingView = ({ training, onReturn, onUpdate, onChange }) => {
  return (
    <div className="content">
      <Row>
        <Col lg={6} md={10} sm={12} xs={12} className="ml-auto mr-auto">
          <Card>
            <CardHeader>
              <span className="ml-auto">
                <a href="#back" onClick={e => e.preventDefault() || onReturn('trainings', null)}>
                  <i className="fa fa-arrow-left fa-2x" />
                </a>
              </span>
              <CardTitle tag="h4" className="text-center">
                Complete training
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Form>
                    {training.activities &&
                      training.activities.map(e => (
                        <>
                          <small>{e.description}</small>
                          <hr />
                          <Row form>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Distance</Label>
                                <Input type="text" value="0.0" />
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Time</Label>
                                <Input type="text" value="0.0" />
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Pace</Label>
                                <Input type="text" value="0.0" />
                              </FormGroup>
                            </Col>
                            <Col md={2}>
                              <FormGroup>
                                <Label>Avg HR</Label>
                                <Input type="text" value="0.0" />
                              </FormGroup>
                            </Col>
                          </Row>
                        </>
                      ))}
                    <Row form className="mt-4">
                      <Col md={6}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              checked={training.completed}
                              type="checkbox"
                              onChange={onChange}
                            />
                            Did you finish the training?
                            <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={2} className="ml-auto">
                        <Button color="success">Update</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SingleTrainingView
