import React from "react";

import { Table } from "reactstrap";
import TrainingsTableActionCell from "components/TrainingsTable/TrainingTableActionCell";

const ActivitiesTable = ({ data, onEdit, onDelete }) => {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-right">Order</th>
            <th className="text-right">Distance</th>
            <th className="text-right">Description</th>
            <th className="text-right">Comment</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((activity, key) => (
            <tr key={key}>
              <td className="text-right">{activity.order}</td>
              <td className="text-right">{activity.distance} km</td>
              <td className="text-right">{activity.trainingDescription}</td>
              <td className="text-right">{activity.comment}</td>
              <td className="text-right">
                <TrainingsTableActionCell
                  color="success"
                  id={"-edit-" + activity.order}
                  size="sm"
                  tooltip="Edit"
                  icon="fa fa-edit"
                  click={() => onEdit(activity)}
                />
                <TrainingsTableActionCell
                  color="danger"
                  id={"-delete-" + activity.order}
                  size="sm"
                  tooltip="Delete"
                  icon="fa fa-times"
                  click={() => onDelete(activity.order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ActivitiesTable;
