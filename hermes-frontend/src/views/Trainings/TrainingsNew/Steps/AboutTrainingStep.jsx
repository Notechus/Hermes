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
import { verifyFutureDate, verifyLength, verifyRangeInclusive } from "utils/validation";

class AboutTrainingStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      image: "",
      username: "",
      trainingDescription: "",
      trainingDate: "",
      memberAvatar: "",
      usernameState: "",
      trainingDescriptionState: "",
      trainingDateState: ""
    };
  }

  change = (event, stateName, type, value1, value2) => {
    switch (type) {
      case "date":
        if (verifyFutureDate(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (verifyLength(event.target.value, value1)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "range":
        if (verifyRangeInclusive(event.target.value.length, value1, value2)) {
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
    if (
      this.state.usernameState === "has-success" &&
      this.state.trainingDateState === "has-success"
    ) {
      return true;
    } else {
      if (this.state.usernameState !== "has-success") {
        this.setState({ usernameState: "has-danger" });
      }
      if (this.state.trainingDateState !== "has-success") {
        this.setState({ trainingDateState: "has-danger" });
      }
      return false;
    }
  };

  // function that returns true if value is email, false otherwise
  render() {
    return (
      <>
        <h5 className="info-text">Let's start with the basic information</h5>
        <Row className="justify-content-center">
          <Col sm="2">
            <PictureAvatarNoUpload image={this.state.image} loaded={this.state.loaded} />
          </Col>
          <Col sm="4" className="mt-1">
            <InputGroup
              className={classnames(this.state.usernameState, {
                "input-group-focus": this.state.usernameFocus
              })}
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="username"
                placeholder="Username (required)"
                type="text"
                onChange={e => this.change(e, "username", "length", 3)}
                onFocus={() => this.setState({ usernameFocus: true })}
                onBlur={() => this.setState({ usernameFocus: false })}
              />
              {this.state.usernameState === "has-danger" && (
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
            <FormGroup
              className={classnames(this.state.trainingDescriptionState, {
                "input-group-focus": this.state.trainingDescriptionFocus
              })}
            >
              <Input
                name="trainingDescription"
                type="textarea"
                placeholder="Description"
                value={this.state.trainingDescription}
                onChange={e => this.change(e, "trainingDescription", "range", 2, 150)}
                onFocus={() => this.setState({ trainingDescriptionFocus: true })}
                onBlur={() => this.setState({ trainingDescriptionFocus: false })}
              />
              {this.state.trainingDescriptionState === "has-danger" && (
                <label className="error">
                  This field is required and must be between 1 and 150 characters.
                </label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default AboutTrainingStep;
