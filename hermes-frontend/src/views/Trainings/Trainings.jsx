import React from "react";
import { connect } from "react-redux";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { getUser } from "reducers/authorizationDataReducer";
import {
  getCurrentWeekTrainings,
  getPastTrainings
} from "reducers/trainingsReducer";
import {
  fetchCurrentWeekForUser,
  fetchPastTrainingsForUser
} from "actions/trainingsActions";
import TrainingsTable from "components/TrainingsTable/TrainingsTable";

const trainingsHeader = [
  "Activity Date",
  "Completed",
  "Description",
  "Coach Notes",
  "Coach",
  "Actions"
];

class Trainings extends React.Component {
  componentDidMount() {
    const username = this.props.user ? this.props.user.profile.username : "";
    this.props.fetchCurrentWeek(username);
    this.props.fetchPastTrainings(username);
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <TrainingsTable
                    header={trainingsHeader}
                    data={this.props.currentWeek}
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
    dispatch(fetchPastTrainingsForUser(username, page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trainings);
