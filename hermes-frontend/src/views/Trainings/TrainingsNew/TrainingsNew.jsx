import React from "react";
import { connect } from "react-redux";
import { getUser } from "reducers/authorizationDataReducer";

import ReactWizard from "react-bootstrap-wizard";
import { Col } from "reactstrap";

import AboutTrainingStep from "./Steps/AboutTrainingStep.jsx";
import Step2 from "./Steps/Step2.jsx";
import Step3 from "./Steps/Step3.jsx";

const steps = [
  {
    stepName: "About",
    stepIcon: "nc-icon nc-single-02",
    component: AboutTrainingStep
  },
  {
    stepName: "Account",
    stepIcon: "nc-icon nc-touch-id",
    component: Step2
  },
  {
    stepName: "Address",
    stepIcon: "nc-icon nc-pin-3",
    component: Step3
  }
];

class TrainingsNew extends React.Component {
  state = {};

  componentDidMount() {}

  createNewTraining = formState => {
    console.log(formState);

    // const { fullName } = formState;
    //dispatch action here
  };

  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Add a new training"
              description="Please fill all necessary information"
              headerTextCenter
              finishButtonClasses="btn-wd"
              finishButtonClick={this.createNewTraining}
              nextButtonClasses="btn-wd"
              previousButtonClasses="btn-wd"
            />
          </Col>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsNew);
