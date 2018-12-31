import React from "react";

import { Col, Row } from "reactstrap";

import { formatDateAsString } from "utils/functions";
import PictureAvatarNoUpload from "components/CustomUpload/PictureAvatarNoUpload.jsx";

const BasicInfoTrainingSummary = ({
  fullName,
  avatar,
  loaded,
  trainingDate
}) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="6">
          <PictureAvatarNoUpload image={avatar} loaded={loaded} />
        </Col>
        <Col sm="6">
          <h6>Member name: {fullName}</h6>
          <h6>Training Date: {formatDateAsString(trainingDate)}</h6>
        </Col>
      </Row>
    </>
  );
};

export default BasicInfoTrainingSummary;
