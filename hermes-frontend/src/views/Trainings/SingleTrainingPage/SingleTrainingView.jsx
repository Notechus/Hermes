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
import { Link } from 'react-router-dom'
import { DATETIME_FORMAT } from 'utils/functions'
import TrainingActivityCompleteForm from 'components/TrainingsPage/TrainingActivityCompleteForm.jsx'

const SingleTrainingView = ({
  activities,
  completed,
  modificationTime,
  onUpdate,
  onChange,
  onCompleted,
  loading,
}) => {
  return (
    <div className="content">
      <Row>
        <Col lg={6} md={10} sm={12} xs={12} className="ml-auto mr-auto">
          <Card>
            <CardHeader>
              <span className="ml-auto">
                <Link to="/app/trainings">
                  <i className="fa fa-arrow-left fa-2x" style={{ color: 'gray' }} />
                </Link>
              </span>
              <CardTitle tag="h4" className="text-center">
                Complete training
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Form>
                    {activities &&
                      activities.map((e, key) => (
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
                            <Input checked={completed} type="checkbox" onChange={onCompleted} />
                            Did you finish the training?
                            <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      {modificationTime && (
                        <Col md={6} className="mr-auto mt-4 text-muted">
                          Modified at: {moment(modificationTime).format(DATETIME_FORMAT)}
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
                onClick={onUpdate}
                disabled={loading}
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(SingleTrainingView)
