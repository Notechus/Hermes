import React from "react";

import { Col, Row } from "reactstrap";

const ActivitiesTrainingSummary = ({ activities }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="12">
          <h6>Activities: {activities.length}</h6>
          {activities.map((prop, key) => (
            <h6 key={key} className="text-muted ml-3">
              {prop.order}. {prop.distance} km - {prop.trainingDescription} (
              {prop.comment})
            </h6>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ActivitiesTrainingSummary;
