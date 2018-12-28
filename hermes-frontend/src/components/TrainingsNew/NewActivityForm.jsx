import React from "react";
import classnames from "classnames";
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
        <InputGroup
          className={classnames(mileageState, {
            "input-group-focus": mileageFocus
          })}
        >
          <Input
            name="mileage"
            placeholder="Mileage"
            type="text"
            value={mileage}
            onChange={e => onChange(e, "mileage")}
            onFocus={() => onFocus("mileage", true)}
            onBlur={() => onFocus("mileage", false)}
          />
          <InputGroupAddon addonType="append">km</InputGroupAddon>
          {mileageState === "has-danger" && (
            <label className="error">
              This field is required and must be a positive number.
            </label>
          )}
        </InputGroup>
        <FormGroup
          className={classnames(descriptionState, {
            "input-group-focus": descriptionFocus
          })}
        >
          <Input
            name="description"
            placeholder="Description"
            type="textarea"
            value={description}
            onChange={e => onChange(e, "description")}
            onFocus={() => onFocus("description", true)}
            onBlur={() => onFocus("description", false)}
          />
          {descriptionState === "has-danger" && (
            <label className="error">
              This field is required and must be between 1 and 150 characters.
            </label>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            name="comment"
            placeholder="Comment"
            type="textarea"
            value={comment}
            onChange={e => onChange(e, "comment")}
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
