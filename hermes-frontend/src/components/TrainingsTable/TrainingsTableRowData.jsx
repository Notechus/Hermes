import React from "react";
import PropTypes from "prop-types";
import { Label, Input, FormGroup } from "reactstrap";

const TrainingsTableRowData = ({ row, onChange }) => {
  return (
    <>
      <td className="text-center">{row.activityDate}</td>
      <td className="text-center">
        <FormGroup check>
          <Label check>
            <Input
              checked={row.completed}
              type="checkbox"
              onChange={onChange}
            />
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
  row: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TrainingsTableRowData;
