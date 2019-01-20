import React from "react";
import { Badge } from "reactstrap";

const getMileage = activities => {
  return activities
    ? activities.map(e => (e.mileage ? e.mileage : 0.0)).reduce((a, b) => a + b, 0.0)
    : 0.0;
};

const TrainingCardBody = ({ intensity, description, activities, completed }) => {
  return (
    <>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <Badge color="info" pill>
            Intensity: {intensity}
          </Badge>
          <Badge color="success" pill>
            Distance: {getMileage(activities)} km
          </Badge>
          {completed && <Badge>Completed</Badge>}
        </div>
        <div className="timeline-body mt-2">
          <p>Description: {description}</p>
          <p>
            <strong>Activities: {activities ? activities.length : 0}</strong>
          </p>
          {activities &&
            activities.map((prop, key) => (
              <p key={key} className="text-muted ml-3">
                {prop.order}. {prop.mileage} km - {prop.trainingDescription} ({prop.comment})
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default TrainingCardBody;
