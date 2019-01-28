import React from "react";
import { Badge } from "reactstrap";

const getDistance = activities => {
  return activities
    ? activities.map(e => (e.distance ? e.distance : 0.0)).reduce((a, b) => a + b, 0.0)
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
            Distance: {getDistance(activities)} km
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
                {prop.order}. {prop.distance} km - {prop.description}{" "}
                {prop.comment && "(" + prop.comment + ")"}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default TrainingCardBody;
