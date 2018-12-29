import React from "react";
import classnames from "classnames";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";

const NewActivityForm = ({
  order,
  mileage,
  mileageState,
  mileageFocus,
  description,
  descriptionState,
  descriptionFocus,
  comment,
  commentState,
  commentFocus,
  onChange,
  onFocus,
  onSubmit
}) => {
  return (
    <>
      <Form action="#" method="#">
        <Row>
          <Col sm="3">
            <label>Order</label>
            <FormGroup>
              <Input
                name="order"
                placeholder="Order"
                type="number"
                min={0}
                value={order}
                onChange={e => onChange(e, "order")}
              />
            </FormGroup>
            <label>Mileage (in km)</label>
            <FormGroup
              className={classnames(mileageState, {
                "input-group-focus": mileageFocus
              })}
            >
              <Input
                name="mileage"
                type="text"
                value={mileage}
                onChange={e => onChange(e, "mileage")}
                onFocus={() => onFocus("mileage", true)}
                onBlur={() => onFocus("mileage", false)}
              />
              {mileageState === "has-danger" && (
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
                "input-group-focus": descriptionFocus
              })}
            >
              <Input
                name="description"
                type="textarea"
                value={description}
                onChange={e => onChange(e, "description")}
                onFocus={() => onFocus("description", true)}
                onBlur={() => onFocus("description", false)}
              />
              {descriptionState === "has-danger" && (
                <label className="error">
                  This field is required and must be between 1 and 150
                  characters.
                </label>
              )}
            </FormGroup>
          </Col>
          <Col sm="4">
            <label>Comment</label>
            <FormGroup>
              <Input
                name="comment"
                type="textarea"
                value={comment}
                onChange={e => onChange(e, "comment")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <FormGroup>
              <Button
                className="btn-default"
                color="default"
                type="button"
                onClick={onSubmit}
              >
                Add
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default NewActivityForm;
