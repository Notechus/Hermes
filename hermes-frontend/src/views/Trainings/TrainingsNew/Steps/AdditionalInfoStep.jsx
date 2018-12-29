import React from "react";
// react plugin used to create DropdownMenu for selecting items
// reactstrap components
import { Col, FormGroup, Input, Row } from "reactstrap";
import Slider from "nouislider";

class AdditionalInfoStep extends React.Component {
  state = {
    intensity: 5,
    importance: 5,
    trainingComment: ""
  };

  componentDidMount() {
    this.createSliders();
  }

  createSliders = () => {
    const intensitySlider = this.refs.intensitySlider;
    const importanceSlider = this.refs.importanceSlider;

    Slider.create(intensitySlider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 10 }
    });

    Slider.create(importanceSlider, {
      start: [5],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 10 }
    });

    intensitySlider.noUiSlider.on("update", (values, handle) => {
      this.setState({ intensity: Math.trunc(values[handle]) });
    });
    importanceSlider.noUiSlider.on("update", (values, handle) => {
      this.setState({ importance: Math.trunc(values[handle]) });
    });
  };

  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col sm="12">
            <h5 className="info-text">
              Do you have any additional information?
            </h5>
          </Col>
          <Col sm="6">
            <FormGroup>
              <label>Intensity (1-10)</label>
              <div className="slider slider-success" ref="intensitySlider" />
              <Input
                type="text"
                className="text-center"
                readOnly
                value={this.state.intensity}
              />
            </FormGroup>
            <FormGroup>
              <label>Importance (1-10)</label>
              <div className="slider slider-info" ref="importanceSlider" />
              <Input
                type="text"
                className="text-center"
                readOnly
                value={this.state.importance}
              />
            </FormGroup>
            <FormGroup>
              <label>Additional Comments</label>
              <Input
                type="textarea"
                name="trainingComment"
                onChange={e =>
                  this.setState({ trainingComment: e.target.value })
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default AdditionalInfoStep;
