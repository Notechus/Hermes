import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import TrainingsTableActionCell from "components/TrainingsTable/TrainingTableActionCell";
import TrainingsTableRowData from "components/TrainingsTable/TrainingsTableRowData";

const TrainingsTable = ({ header, data, onChange, onEdit, onDelete }) => {
  return (
    <Table responsive>
      <thead className="text-primary">
        <tr>
          {header.map((prop, key) => (
            <th key={key} className="text-center">
              {prop}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((prop, key) => (
          <tr key={key}>
            <TrainingsTableRowData row={prop} onChange={() => onChange(prop)} />
            <td className="text-right">
              <TrainingsTableActionCell
                color="success"
                tooltipId={"-edit-" + prop.trainingId}
                size="sm"
                tooltip="Edit"
                icon="fa fa-edit"
                click={onEdit}
              />
              <TrainingsTableActionCell
                color="danger"
                tooltipId={"-delete-" + prop.trainingId}
                size="sm"
                tooltip="Delete"
                icon="fa fa-times"
                click={onDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TrainingsTable.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default TrainingsTable;
