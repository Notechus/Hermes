import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import TrainingsTableActionCell from "components/TrainingsTable/TrainingTableActionCell";
import TrainingsTableRowData from "components/TrainingsTable/TrainingsTableRowData";

const TrainingsTable = ({ header, data, onEdit, onDelete }) => {
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
            <TrainingsTableRowData row={prop} />
            <td className="text-right">
              <TrainingsTableActionCell
                color="info"
                id={"-like-" + prop.id}
                size="sm"
                tooltip="Like"
                icon="fa fa-user"
                click={() => {}}
              />
              <TrainingsTableActionCell
                color="success"
                id={"-edit-" + prop.id}
                size="sm"
                tooltip="Edit"
                icon="fa fa-edit"
                click={onEdit}
              />
              <TrainingsTableActionCell
                color="danger"
                id={"-delete-" + prop.id}
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default TrainingsTable;
