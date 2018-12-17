import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Label from "reactstrap/src/Label";
import Input from "reactstrap/src/Input";
import FormGroup from "reactstrap/src/FormGroup";

const TrainingsTableRowData = ({ row }) => {
  return (
    <Fragment>
      <td>{row.activityDate}</td>
      <td>
        <FormGroup check>
          <Label check>
            <Input checked={row.completed} type="checkbox" />
            <span className="form-check-sign" />
          </Label>
        </FormGroup>
      </td>
      <td>{row.description}</td>
      <td>{row.coachNotes}</td>
      <td>{row.coach}</td>
    </Fragment>
  );
};

TrainingsTableRowData.propTypes = {
  row: PropTypes.object.isRequired
};

export default TrainingsTableRowData;
