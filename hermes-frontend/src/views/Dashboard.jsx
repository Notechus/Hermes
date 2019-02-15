import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
// react plugin used to create charts
import { Line } from 'react-chartjs-2'
// reactstrap components
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { fetchTrainingsForUser } from 'actions/trainingsActions'
import { fetchUserTeam } from 'actions/teamsActions'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard'
import TotalDistanceStatisticCard from 'components/Dashboard/TotalDistanceStatisticCard'
import TotalProgressStatisticCard from 'components/Dashboard/TotalProgressStatisticCard'
import TrainingCardBody from 'components/Dashboard/TrainingCardBody'
import {
  getCurrentMonthTrainings,
  getNextTraining,
  getPreviousTraining,
  getTrainings,
} from 'reducers/trainingsReducer'
import { getUser } from 'reducers/authorizationDataReducer'
import { getWebStatistic } from 'reducers/webStatisticsReducer'
import { chartExample2, chartExample3 } from 'variables/charts.jsx'

import { DATE_FORMAT, sortByActivityOrderAsc } from 'utils/functions'
import DashboardUpdateTimeFooter from 'components/Dashboard/DashboardUpdateTimeFooter'
import DashboardDistanceLineChart from 'components/Dashboard/DashboardDistanceLineChart'

class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.username) {
      this.props.fetchTrainings(this.props.user.username)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.user &&
      this.props.user.username &&
      this.props.user.username !== prevProps.user.username
    ) {
      this.props.fetchTrainings(this.props.user.username)
      this.props.fetchTeam(this.props.user.username)
    }
  }

  render() {
    const { nextTraining, previousTraining, trainingsUpdated, trainings } = this.props
    return (
      <>
        <div className="content">
          <Row>
            <Col md="3">
              <DashboardStatisticsCard
                title="Next training"
                subTitle={nextTraining ? moment(nextTraining.trainingDate).format(DATE_FORMAT) : ''}
                footerStats={<DashboardUpdateTimeFooter time={trainingsUpdated} />}
              >
                <TrainingCardBody
                  intensity={nextTraining ? nextTraining.intensity : 0}
                  activities={
                    nextTraining ? nextTraining.activities.sort(sortByActivityOrderAsc) : []
                  }
                  description={nextTraining ? nextTraining.description : ''}
                />
              </DashboardStatisticsCard>
            </Col>
            <Col md="3">
              <DashboardStatisticsCard
                title="Last training"
                subTitle={
                  previousTraining ? moment(previousTraining.trainingDate).format(DATE_FORMAT) : ''
                }
                footerStats={<DashboardUpdateTimeFooter time={trainingsUpdated} />}
              >
                <TrainingCardBody
                  intensity={previousTraining ? previousTraining.intensity : 0}
                  activities={
                    previousTraining ? previousTraining.activities.sort(sortByActivityOrderAsc) : []
                  }
                  description={previousTraining ? previousTraining.description : ''}
                />
              </DashboardStatisticsCard>
            </Col>
            <Col md="3">
              <TotalDistanceStatisticCard trainings={trainings} updateTime={trainingsUpdated} />
            </Col>
            <Col md="3">
              <TotalProgressStatisticCard trainings={trainings} updateTime={trainingsUpdated} />
            </Col>
          </Row>
          <Row>
            <Col lg="4" sm="6">
              <DashboardDistanceLineChart />
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
    )
  }
}

const mapStateToProps = state => ({
  nextTraining: getNextTraining(state),
  previousTraining: getPreviousTraining(state),
  trainings: getCurrentMonthTrainings(state),
  yearTrainings: getTrainings(state),
  user: getUser(state),
  trainingsUpdated: getWebStatistic(state, 'LOAD_USER_TRAININGS'),
})

const mapDispatchToProps = dispatch => ({
  fetchTrainings: username => dispatch(fetchTrainingsForUser(username)),
  fetchTeam: username => dispatch(fetchUserTeam(username)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
