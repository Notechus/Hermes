import React from "react";
import PropTypes from "prop-types";
import { Label, Input, FormGroup } from "reactstrap";

const TrainingsTableRowData = ({ row }) => {
  return (
    <>
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
    </>
  );
};

TrainingsTableRowData.propTypes = {
  row: PropTypes.object.isRequired
};

export default TrainingsTableRowData;
