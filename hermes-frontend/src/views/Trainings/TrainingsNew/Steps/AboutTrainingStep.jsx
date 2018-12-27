import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import ReactDatetime from "react-datetime";
// core components
import PictureAvatarNoUpload from "components/CustomUpload/PictureAvatarNoUpload.jsx";
import { verifyFutureDate, verifyLength } from "utils/validation";

class AboutTrainingStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      image: "",
      fullName: "",
      trainingDate: "",
      memberAvatar: "",
      fullNameState: "",
      trainingDateState: ""
    };
  }

  change = (event, stateName, type, stateNameEqualTo) => {
    switch (type) {
      case "date":
        if (verifyFutureDate(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };

  isValidated = () => {
    // if (
    //   this.state.fullNameState === "has-success" &&
    //   this.state.trainingDateState === "has-success"
    // ) {
    //   return true;
    // } else {
    //   if (this.state.fullNameState !== "has-success") {
    //     this.setState({ fullNameState: "has-danger" });
    //   }
    //   if (this.state.trainingDateState !== "has-success") {
    //     this.setState({ trainingDateState: "has-danger" });
    //   }
    //   return false;
    // }
    return true;
  };

  // function that returns true if value is email, false otherwise
  render() {
    return (
      <>
        <h5 className="info-text">Let's start with the basic information</h5>
        <Row className="justify-content-center">
          <Col sm="4">
            <PictureAvatarNoUpload
              image={this.state.image}
              loaded={this.state.loaded}
            />
          </Col>
          <Col sm="6" className="mt-3">
            <InputGroup
              className={classnames(this.state.fullNameState, {
                "input-group-focus": this.state.fullNameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="fullName"
                placeholder="Full Name (required)"
                type="text"
                onChange={e => this.change(e, "fullName", "length", 3)}
                onFocus={() => this.setState({ fullNameFocus: true })}
                onBlur={() => this.setState({ fullNameFocus: false })}
              />
              {this.state.fullNameState === "has-danger" && (
                <label className="error">This field is required.</label>
              )}
            </InputGroup>
            <FormGroup
              className={classnames(this.state.trainingDateState, {
                "input-group-focus": this.state.trainingDateFocus
              })}
            >
              <ReactDatetime
                inputProps={{
                  className: "form-control",
                  placeholder: "Training Date (required)"
                }}
                timeFormat={false}
                isValidDate={verifyFutureDate}
                onChange={date => {
                  if (verifyFutureDate(date)) {
                    this.setState({
                      trainingDate: date,
                      trainingDateState: "has-success"
                    });
                  } else {
                    this.setState({ trainingDateState: "has-danger" });
                  }
                }}
                dateFormat="YYYY-MM-DD"
                closeOnSelect={true}
                value={this.state.trainingDate}
              />
              {this.state.trainingDateState === "has-danger" && (
                <label className="error">This field is required.</label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default AboutTrainingStep;
