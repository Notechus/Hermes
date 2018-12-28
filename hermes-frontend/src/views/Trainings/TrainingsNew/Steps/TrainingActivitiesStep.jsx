import React from "react";
// reactstrap components
import { Col, Row } from "reactstrap";

import { compareOrders } from "utils/functions";
import { verifyIsPositiveNumber, verifyRangeInclusive } from "utils/validation";
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
      mileageState: "",
      descriptionState: "",
      commentState: ""
    };
  }

  isValidated = () => {
    return true;
  };

  addActivity = () => {
    const { description, comment } = this.state;
    const order = Number.parseInt(this.state.order);
    const mileage = Number.parseFloat(this.state.mileage);

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

  changeFocus = (name, value) => {
    this.setState({ [name + "Focus"]: value });
  };

  change = (event, type) => {
    switch (type) {
      case "mileage":
        const val = event.target.value.includes(".")
          ? Number.parseFloat(event.target.value)
          : Number.parseInt(event.target.value);
        if (event.target.value !== "" && verifyIsPositiveNumber(val)) {
          this.setState({ mileageState: "has-success" });
        } else {
          this.setState({ mileageState: "has-danger" });
        }
        break;
      case "description":
        if (verifyRangeInclusive(event.target.value.length, 1, 150)) {
          this.setState({ descriptionState: "has-success" });
        } else {
          this.setState({ descriptionState: "has-danger" });
        }
        break;
      default:
        break;
    }
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
                  mileageState={this.state.mileageState}
                  mileageFocus={this.state.mileageFocus}
                  description={this.state.description}
                  descriptionState={this.state.descriptionState}
                  descriptionFocus={this.state.descriptionFocus}
                  comment={this.state.comment}
                  commentState={this.state.commentState}
                  commentFocus={this.state.commentFocus}
                  onChange={this.change}
                  onFocus={this.changeFocus}
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
