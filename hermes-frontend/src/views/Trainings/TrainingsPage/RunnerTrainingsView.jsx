import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TrainingsTable from 'components/TrainingsTable/TrainingsTable.jsx'
import { sortByTrainingDateAsc, sortByTrainingDateDesc } from 'utils/functions'
import { getCurrentWeekTrainings, getTrainingsExceptCurrentWeek } from 'reducers/trainingsReducer'
import { connect } from 'react-redux'

const RunnerTrainingsView = ({ currentWeek, trainings, onLink }) => {
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
                  data={currentWeek ? currentWeek.sort(sortByTrainingDateDesc) : []}
                  onChange={onLink}
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
                  data={trainings ? trainings.sort(sortByTrainingDateAsc) : []}
                  onChange={onLink}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  currentWeek: getCurrentWeekTrainings(state),
  trainings: getTrainingsExceptCurrentWeek(state),
})

export default connect(mapStateToProps)(React.memo(RunnerTrainingsView))
