import React from 'react'
import moment from 'moment'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { DATETIME_FORMAT } from 'utils/functions'
import TrainingActivityCompleteForm from 'components/TrainingsPage/TrainingActivityCompleteForm.jsx'

const SingleTrainingView = ({ training, onReturn, onUpdate, onChange, onCompleted }) => {
  return (
    <div className="content">
      <Row>
        <Col lg={6} md={10} sm={12} xs={12} className="ml-auto mr-auto">
          <Card>
            <CardHeader>
              <span className="ml-auto">
                <a href="#back" onClick={e => e.preventDefault() || onReturn('trainings', null)}>
                  <i className="fa fa-arrow-left fa-2x" style={{ color: 'gray' }} />
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
                      training.activities.map((e, key) => (
                        <TrainingActivityCompleteForm
                          key={key}
                          order={e.order}
                          description={e.description}
                          distance={e.distance}
                          time={e.time}
                          hr={e.hr}
                          pace={e.pace}
                          onChange={onChange}
                        />
                      ))}
                    <Row form className="mt-4">
                      <Col md={6}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              checked={training.completed}
                              type="checkbox"
                              onChange={onCompleted}
                            />
                            Did you finish the training?
                            <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      {training.modificationDate && (
                        <Col md={6} className="mr-auto mt-4 text-muted">
                          Modified at: {moment(training.modificationDate).format(DATETIME_FORMAT)}
                        </Col>
                      )}
                      <Col md={2} className="ml-auto" />
                    </Row>
                  </Form>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                size="sm"
                color="success"
                className="btn-round"
                onClick={e => {
                  e.preventDefault()
                  onUpdate()
                }}
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {/*<Row>*/}
      {/*<Col lg={6} md={10} sm={12} xs={12} className="ml-auto mr-auto">*/}
      {/*<Card>*/}
      {/*<CardHeader>*/}
      {/*<CardTitle tag="h4" className="text-center">*/}
      {/*Comments*/}
      {/*</CardTitle>*/}
      {/*</CardHeader>*/}
      {/*<CardBody>comments here</CardBody>*/}
      {/*<CardFooter>*/}
      {/*<Button*/}
      {/*size="sm"*/}
      {/*className="btn-round"*/}
      {/*color="success"*/}
      {/*onClick={e => {*/}
      {/*e.preventDefault()*/}
      {/*}}*/}
      {/*>*/}
      {/*Add comment*/}
      {/*</Button>*/}
      {/*</CardFooter>*/}
      {/*</Card>*/}
      {/*</Col>*/}
      {/*</Row>*/}
    </div>
  )
}

export default SingleTrainingView
