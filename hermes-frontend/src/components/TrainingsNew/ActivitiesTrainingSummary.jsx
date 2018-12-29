import React from "react";

import { Col, Row } from "reactstrap";

const ActivitiesTrainingSummary = ({ activities }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="12">
          <h6>Activities: {activities.length}</h6>
          {activities.map((prop, key) => (
            <p key={key} className="text-muted">
              {prop.order}. {prop.mileage} km - {prop.description} (
              {prop.comment})
            </p>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ActivitiesTrainingSummary;
