import React from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

const TrainingActivityCompleteForm = ({
  order,
  description,
  distance,
  time,
  hr,
  pace,
  onChange,
}) => {
  return (
    <>
      <small>{description}</small>
      <hr />
      <Row form>
        <Col md={2} />
        <Col md={2}>
          <FormGroup>
            <Label>Distance</Label>
            <Input
              type="text"
              name="distance"
              value={distance}
              onChange={e => onChange('distance', order, e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label>Time</Label>
            <Input
              type="text"
              name="time"
              value={time}
              onChange={e => onChange('time', order, e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label>Pace</Label>
            <Input
              type="text"
              name="pace"
              value={pace}
              onChange={e => onChange('pace', order, e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label>Avg HR</Label>
            <Input
              type="text"
              name="hr"
              value={hr}
              onChange={e => onChange('hr', order, e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}

export default TrainingActivityCompleteForm
