import React from 'react'

import { Col, FormGroup, Input, Row } from 'reactstrap'

const AdditionalInfoTrainingSummary = ({ onChange }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col sm="12">
          <FormGroup>
            <label>Additional Comments</label>
            <Input type="textarea" name="trainingComment" onChange={onChange} />
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}

export default React.memo(AdditionalInfoTrainingSummary)
