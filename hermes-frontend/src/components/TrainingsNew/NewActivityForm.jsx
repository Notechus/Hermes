import React from 'react'
import classnames from 'classnames'
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap'

const NewActivityForm = ({
  order,
  distance,
  distanceState,
  distanceFocus,
  description,
  descriptionState,
  descriptionFocus,
  comment,
  commentState,
  commentFocus,
  onChange,
  onFocus,
  onSubmit,
}) => {
  return (
    <>
      <Form action="#" method="#">
        <Row>
          <Col sm="3">
            <label>Distance (in km)</label>
            <FormGroup
              className={classnames(distanceState, {
                'input-group-focus': distanceFocus,
              })}
            >
              <Input
                name="distance"
                type="text"
                value={distance}
                onChange={e => onChange(e, 'distance')}
                onFocus={() => onFocus('distance', true)}
                onBlur={() => onFocus('distance', false)}
              />
              {distanceState === 'has-danger' && (
                <label className="error">
                  This field is required and must be a positive number.
                </label>
              )}
            </FormGroup>
          </Col>
          <Col sm="4">
            <label>Description</label>
            <FormGroup
              className={classnames(descriptionState, {
                'input-group-focus': descriptionFocus,
              })}
            >
              <Input
                name="description"
                type="text"
                value={description}
                onChange={e => onChange(e, 'description')}
                onFocus={() => onFocus('description', true)}
                onBlur={() => onFocus('description', false)}
              />
              {descriptionState === 'has-danger' && (
                <label className="error">
                  This field is required and must be between 1 and 150 characters.
                </label>
              )}
            </FormGroup>
          </Col>
          <Col sm="4">
            <label>Comment</label>
            <FormGroup>
              <Input
                name="comment"
                type="text"
                value={comment}
                onChange={e => onChange(e, 'comment')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <FormGroup>
              <Button className="btn-default" color="default" type="button" onClick={onSubmit}>
                Add
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default React.memo(NewActivityForm)
