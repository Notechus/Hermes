import React from "react";

import { Col, Row } from "reactstrap";

import { formatDateAsString } from "utils/functions";
import PictureAvatarNoUpload from "components/CustomUpload/PictureAvatarNoUpload.jsx";

const BasicInfoTrainingSummary = ({ fullName, avatar, trainingDate }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="6">
          <PictureAvatarNoUpload image={avatar} loaded={false} />
        </Col>
        <Col sm="6">
          <h6>Member name: {fullName}</h6>
          <p>Training Date: {formatDateAsString(trainingDate)}</p>
        </Col>
      </Row>
    </>
  );
};

export default BasicInfoTrainingSummary;
