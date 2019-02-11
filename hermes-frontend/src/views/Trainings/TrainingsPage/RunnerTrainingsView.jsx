import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TrainingsTable from 'components/TrainingsTable/TrainingsTable.jsx'
import { sortByTrainingDateAsc, sortByTrainingDateDesc } from 'utils/functions'
import { getCurrentWeekTrainings, getTrainingsExceptCurrentWeek } from 'reducers/trainingsReducer'
import { connect } from 'react-redux'

// hideAlert = () => {
//   this.setState({
//     alert: null,
//   })
// }
//
// warningWithConfirmMessage = training => {
//   this.setState({
//     alert: (
//       <ReactBSAlert
//         warning
//         style={{ display: 'block', marginTop: '-100px' }}
//         title="Are you sure?"
//         onConfirm={() => this.removeTraining(training)}
//         onCancel={() => this.hideAlert()}
//         confirmBtnBsStyle="info"
//         cancelBtnBsStyle="danger"
//         confirmBtnText="Yes, delete it!"
//         cancelBtnText="Cancel"
//         showCancel
//       >
//         You will not be able to recover this training!
//       </ReactBSAlert>
//     ),
//   })
// }

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

export default connect(mapStateToProps)(RunnerTrainingsView)
