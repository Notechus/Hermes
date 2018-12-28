import React from "react";
import { connect } from "react-redux";
import { getUser } from "reducers/authorizationDataReducer";

import ReactWizard from "react-bootstrap-wizard";
import { Col } from "reactstrap";

import AboutTrainingStep from "./Steps/AboutTrainingStep.jsx";
import TrainingActivitiesStep from "./Steps/TrainingActivitiesStep.jsx";
import AdditionalInfoStep from "./Steps/AdditionalInfoStep.jsx";

const steps = [
  {
    stepName: "About",
    stepIcon: "nc-icon nc-alert-circle-i",
    component: AboutTrainingStep
  },
  {
    stepName: "Activities",
    stepIcon: "nc-icon nc-user-run",
    component: TrainingActivitiesStep
  },
  {
    stepName: "Additional Information",
    stepIcon: "nc-icon nc-single-copy-04",
    component: AdditionalInfoStep
  },
  {
    stepName: "Summary",
    stepIcon: "nc-icon nc-bookmark-2",
    component: AdditionalInfoStep
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
          <Col className="ml-auto mr-auto" md="10">
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