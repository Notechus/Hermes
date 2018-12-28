import React from "react";

import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

const NewActivityForm = ({
  order,
  mileage,
  description,
  comment,
  onChange,
  onSubmit
}) => {
  return (
    <>
      <Form action="#" method="#">
        <label>Order</label>
        <FormGroup>
          <Input
            name="order"
            placeholder="Order"
            type="number"
            min={0}
            value={order}
            onChange={onChange}
          />
        </FormGroup>
        <InputGroup>
          <Input
            name="mileage"
            placeholder="Mileage"
            type="text"
            value={mileage}
            onChange={onChange}
          />
          <InputGroupAddon addonType="append">km</InputGroupAddon>
        </InputGroup>
        <FormGroup>
          <Input
            name="description"
            placeholder="Description"
            type="textarea"
            value={description}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="comment"
            placeholder="Comment"
            type="textarea"
            value={comment}
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Button
            className="btn-default"
            color="default"
            type="button"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default NewActivityForm;
