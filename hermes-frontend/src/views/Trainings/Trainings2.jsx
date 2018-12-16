import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { currentWeek, pastTrainings } from "helpers/data/trainings";
import Checkbox from "components/CustomCheckbox/CustomCheckbox";

class Trainings2 extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="This week"
                category="Your trainings"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th key={2}>Activity Date</th>
                        <th key={1}>Completed</th>
                        <th key={3}>Description</th>
                        <th key={5}>Coach Notes</th>
                        <th key={4}>Coach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentWeek.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.activityDate}</td>
                            <td>
                              <Checkbox
                                number={"currentCheckbox" + key}
                                isChecked={prop.completed}
                              />
                            </td>
                            <td>{prop.description}</td>
                            <td>{prop.coachNotes}</td>
                            <td>{prop.coach}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Past trainings"
                category="Your trainings"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th key={2}>Activity Date</th>
                        <th key={1}>Completed</th>
                        <th key={3}>Description</th>
                        <th key={5}>Coach Notes</th>
                        <th key={4}>Coach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastTrainings.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.activityDate}</td>
                            <td>
                              <Checkbox
                                number={"pastCheckbox" + key}
                                isChecked={prop.completed}
                              />
                            </td>
                            <td>{prop.description}</td>
                            <td>{prop.coachNotes}</td>
                            <td>{prop.coach}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Trainings2;
