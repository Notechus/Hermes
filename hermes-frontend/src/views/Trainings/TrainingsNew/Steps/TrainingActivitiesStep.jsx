import React from "react";
// reactstrap components
import { Col, Row } from "reactstrap";

import { compareOrders } from "utils/functions";
import ActivitiesTable from "components/TrainingsNew/ActivitiesTable";
import NewActivityForm from "components/TrainingsNew/NewActivityForm";

class TrainingActivitiesStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      order: 0,
      mileage: 0.0,
      description: "",
      comment: "",
      orderState: "",
      descriptionState: ""
    };
  }

  isValidated = () => {
    return true;
  };

  addActivity = () => {
    const { order, mileage, description, comment } = this.state;

    if (this.state.activities.find(e => e.order === order)) {
      this.setState({
        activities: [
          ...this.state.activities.filter(e => !(e.order === order)),
          { order, mileage, description, comment }
        ].sort((a, b) => compareOrders(a.order, b.order)),
        order: 0,
        mileage: 0.0,
        description: "",
        comment: ""
      });
    } else {
      this.setState({
        activities: [
          ...this.state.activities,
          { order, mileage, description, comment }
        ].sort((a, b) => compareOrders(a.order, b.order)),
        order: 0,
        mileage: 0.0,
        description: "",
        comment: ""
      });
    }
  };

  removeActivity = order => {
    this.setState({
      activities: this.state.activities.filter(e => !(e.order === order))
    });
  };

  editActivity = activity => {
    this.setState({
      order: activity.order,
      mileage: activity.mileage,
      description: activity.description,
      comment: activity.comment
    });
  };

  change = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        <h5 className="info-text">What are the activities?</h5>
        <Row className="justify-content-center">
          <Col lg="10">
            <Row className="justify-content-center">
              <Col sm="12">
                <ActivitiesTable
                  data={this.state.activities}
                  onEdit={this.editActivity}
                  onDelete={this.removeActivity}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <NewActivityForm
                  order={this.state.order}
                  mileage={this.state.mileage}
                  description={this.state.description}
                  comment={this.state.comment}
                  onChange={this.change}
                  onSubmit={this.addActivity}
                />
              </Col>
              <Col sm="6">Here templates</Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default TrainingActivitiesStep;
