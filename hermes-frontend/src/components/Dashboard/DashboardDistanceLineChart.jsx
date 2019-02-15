import React from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { Bar } from 'react-chartjs-2'
import { groupBy, mapValues } from 'lodash'
import { aggregateDistanceFromTrainings } from 'services/trainingCalculationService'
import { createDistanceHistoryBarChart } from 'services/trainingChartService'
import { round, YEAR_WITH_MONTH_FORMAT } from 'utils/functions'
import moment from 'moment'
import { getLastYearOfTrainings } from 'reducers/trainingsReducer'

const DashboardDistanceLineChart = ({ trainings }) => {
  const groupedData = mapValues(
    groupBy(trainings, e => moment(e.trainingDate).format(YEAR_WITH_MONTH_FORMAT)),
    e => round(aggregateDistanceFromTrainings(e))
  )
  const chartData = createDistanceHistoryBarChart(
    Object.keys(groupedData).sort(),
    Object.values(groupedData)
  )
  const values = Object.values(groupedData)
  const totalDistance = values.reduce((a, b) => a + b, 0.0)
  const thisMonth = values[values.length - 1]
  const previousMonth = values[values.length - 2]
  const lastMonthDiff = round(((thisMonth - previousMonth) / previousMonth) * 100)
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col sm="7">
              <div className="numbers pull-left">{totalDistance} km</div>
            </Col>
            <Col sm="5">
              <div className="pull-right">
                <Badge color="success" pill>
                  {lastMonthDiff}%
                </Badge>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <h6 className="big-title">Training distances this year</h6>
          <Bar data={chartData.data} options={chartData.options} height={380} width={826} />
        </CardBody>
        <CardFooter>
          <hr />
          <Row>
            <Col sm="7">
              <div className="footer-title">Distance Statistics</div>
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
    </>
  )
}

const mapStateToProps = state => ({
  trainings: getLastYearOfTrainings(state),
})

export default connect(mapStateToProps)(React.memo(DashboardDistanceLineChart))
