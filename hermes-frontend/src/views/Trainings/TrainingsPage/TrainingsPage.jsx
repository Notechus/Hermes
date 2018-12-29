import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { getUser } from "../../../reducers/authorizationDataReducer";
import {
  getCurrentWeekTrainings,
  getPastTrainings
} from "../../../reducers/trainingsReducer";
import {
  fetchCurrentWeekForUser,
  fetchPastTrainingsForUser,
  updateTraining
} from "../../../actions/trainingsActions";
import TrainingsTable from "../../../components/TrainingsTable/TrainingsTable";
import { sorByDateString } from "../../../utils/functions";

const trainingsHeader = [
  "Activity Date",
  "Completed",
  "Description",
  "Coach Notes",
  "Coach",
  "Actions"
];

class TrainingsPage extends React.Component {
  componentDidMount() {
    const username = this.props.user ? this.props.user.profile.username : "";
    this.props.fetchCurrentWeek(username);
    this.props.fetchPastTrainings(username);
  }

  updateTraining = training => {
    training.completed = !training.completed;
    this.props.updateTraining(training);
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Current Week</CardTitle>
                </CardHeader>
                <CardBody>
                  <TrainingsTable
                    header={trainingsHeader}
                    data={this.props.currentWeek.sort((a, b) =>
                      sorByDateString(a.activityDate, b.activityDate)
                    )}
                    onChange={this.updateTraining}
                    onEdit={() => {
                      console.log("edit");
                    }}
                    onDelete={() => {
                      console.log("delete");
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Trainings</CardTitle>
                </CardHeader>
                <CardBody>
                  <TrainingsTable
                    header={trainingsHeader}
                    data={this.props.pastTrainings.sort((a, b) =>
                      sorByDateString(a.activityDate, b.activityDate)
                    )}
                    onChange={this.updateTraining}
                    onEdit={() => {
                      console.log("edit");
                    }}
                    onDelete={() => {
                      console.log("delete");
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  currentWeek: getCurrentWeekTrainings(state),
  pastTrainings: getPastTrainings(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentWeek: username => dispatch(fetchCurrentWeekForUser(username)),
  fetchPastTrainings: (username, page) =>
    dispatch(fetchPastTrainingsForUser(username, page)),
  updateTraining: training => dispatch(updateTraining(training))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsPage);
