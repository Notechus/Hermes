import React from "react";
import { connect } from "react-redux";
import { getUser } from "reducers/authorizationDataReducer";
import { createNewTraining } from "actions/trainingsActions";

import ReactWizard from "react-bootstrap-wizard";
import { Col } from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";

import AboutTrainingStep from "./Steps/AboutTrainingStep.jsx";
import TrainingActivitiesStep from "./Steps/TrainingActivitiesStep.jsx";
import AdditionalInfoStep from "./Steps/AdditionalInfoStep.jsx";
import TrainingSummaryStep from "./Steps/TrainingSummaryStep.jsx";

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
    component: TrainingSummaryStep
  }
];

class TrainingsNew extends React.Component {
  state = {
    alert: null
  };

  successAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Good job!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          You have successfully added a training!
        </ReactBSAlert>
      )
    });
  };

  hideAlert = () => {
    this.setState({
      alert: null
    });
  };

  componentDidMount() {}

  createNewTraining = formState => {
    console.log(formState);

    const {
      trainingDate,
      username,
      intensity,
      importance,
      trainingComment,
      activities,
      description
    } = formState;
    //dispatch action here
    this.props
      .createTraining({
        runner: username,
        trainingDate: trainingDate,
        trainingDescription: description,
        activities: activities,
        coachNotes: trainingComment,
        importance: importance,
        intensity: intensity
      })
      .then(() => this.successAlert());
  };

  render() {
    return (
      <>
        <div className="content">
          {this.state.alert}
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

const mapDispatchToProps = dispatch => ({
  createTraining: training => dispatch(createNewTraining(training))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsNew);
