import React from "react";
// reactstrap components
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from "reactstrap";

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
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-right">Order</th>
                      <th className="text-right">Mileage</th>
                      <th className="text-right">Description</th>
                      <th className="text-right">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.activities.map(activity => (
                      <tr>
                        <td className="text-right">{activity.order}</td>
                        <td className="text-right">{activity.mileage}</td>
                        <td className="text-right">{activity.description}</td>
                        <td className="text-right">{activity.comment}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-right" />
                      <td className="text-right" />
                      <td className="text-right" />
                      <td className="text-right" />
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <Form action="#" method="#">
                  <label>Order</label>
                  <FormGroup>
                    <Input
                      name="order"
                      placeholder="Order"
                      type="text"
                      value={this.state.order}
                      onChange={this.change}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input placeholder="Mileage" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Input placeholder="Description" type="textarea" />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      className="btn-default"
                      color="default"
                      type="button"
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
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
