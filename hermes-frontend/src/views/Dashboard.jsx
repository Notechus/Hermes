import React from "react";
import moment from "moment";
// react plugin used to create charts
import { Doughnut, Line } from "react-chartjs-2";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row
} from "reactstrap";

import DashboardStatisticsCard from "components/Dashboard/DashboardStatisticsCard";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8
} from "variables/charts.jsx";

import { DATE_FORMAT, DATETIME_FORMAT } from "utils/functions";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="3">
              <DashboardStatisticsCard
                title="Next training"
                subTitle={moment("2018-12-30").format(DATE_FORMAT)}
                body={
                  <Doughnut
                    data={chartExample5.data}
                    options={chartExample5.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                }
                footerLegend={"Completed"}
                footerStats={
                  <>
                    <i className="fa fa-calendar" />
                    Updated {moment().format(DATETIME_FORMAT)}
                  </>
                }
              />
            </Col>
            <Col md="3">
              <DashboardStatisticsCard
                title="Last training"
                subTitle={moment("2018-12-29").format(DATE_FORMAT)}
                body={
                  <Doughnut
                    data={chartExample8.data}
                    options={chartExample8.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                }
                footerLegend={"Finished"}
                footerStats={
                  <>
                    <i className="fa fa-history" />
                    Updated today
                  </>
                }
              />
            </Col>
            <Col md="3">
              <DashboardStatisticsCard
                title="Distance run"
                subTitle={
                  <>
                    Out Of Total <b>4.53 / 12km</b>
                  </>
                }
                body={
                  <Doughnut
                    data={chartExample6.data}
                    options={chartExample6.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                }
                footerLegend="Completed"
                footerStats={
                  <>
                    <i className="fa fa-check" />
                    Updated 2 minutes ago
                  </>
                }
              />
            </Col>
            <Col md="3">
              <DashboardStatisticsCard
                title="Current goal"
                subTitle="Total progress"
                body={
                  <Doughnut
                    data={chartExample7.data}
                    options={chartExample7.options}
                    className="ct-chart ct-perfect-fourth"
                    height={300}
                    width={456}
                  />
                }
                footerLegend="Completed"
                footerStats={
                  <>
                    <i className="fa fa-clock-o" />
                    Updated 3 minutes ago
                  </>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">$34,657</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="success" pill>
                          +18%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">total earnings in last ten quarters</h6>
                  <Line
                    data={chartExample1.data}
                    options={chartExample1.options}
                    height={380}
                    width={826}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">Financial Statistics</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button className="btn-round btn-icon" color="success" size="sm">
                          <i className="nc-icon nc-simple-add" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">169</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="danger" pill>
                          -14%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">total subscriptions in last 7 days</h6>
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                    height={380}
                    width={828}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View all members</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button className="btn-round btn-icon" color="danger" size="sm">
                          <i className="nc-icon nc-button-play" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="4" sm="6">
              <Card>
                <CardHeader>
                  <Row>
                    <Col sm="7">
                      <div className="numbers pull-left">8,960</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Badge color="warning" pill>
                          ~51%
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="big-title">total downloads in last 6 years</h6>
                  <Line
                    data={chartExample3.data}
                    options={chartExample3.options}
                    height={380}
                    width={826}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Row>
                    <Col sm="7">
                      <div className="footer-title">View more details</div>
                    </Col>
                    <Col sm="5">
                      <div className="pull-right">
                        <Button className="btn-round btn-icon" color="warning" size="sm">
                          <i className="nc-icon nc-alert-circle-i" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
