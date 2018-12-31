import React from "react";

import { Col, Row } from "reactstrap";

const AdditionalInfoTrainingSummary = ({ intensity, importance, comment }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="12">
          <h6>Intensity(1-10): {intensity}</h6>
          <h6>Importance(1-10): {importance}</h6>
          <h6>Additional comments:</h6>
          <h6 className="text-muted ml-4">{comment}</h6>
        </Col>
      </Row>
    </>
  );
};

export default AdditionalInfoTrainingSummary;
