import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTrainings } from 'reducers/trainingsReducer'
import { fetchTrainingsForUser, updateTraining } from 'actions/trainingsActions'
import TrainingsTable from 'components/TrainingsTable/TrainingsTable'
import moment from 'moment'
import { sortByTrainingDateAsc, sortByTrainingDateDesc, isDateInRange } from 'utils/functions'

const trainingsHeader = [
  'Training Date',
  'Weekday',
  'Completed',
  'Description',
  'Coach Notes',
  'Coach',
  'Actions',
]

class TrainingsPage extends React.Component {
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
    }
  }

  updateTraining = training => {
    training.completed = !training.completed
    this.props.updateTraining(training)
  }

  getCurrentWeekTrainings = trainings => {
    const startWeek = moment().startOf('isoWeek')
    const endWeek = moment().endOf('isoWeek')
    return trainings
      .filter(training => isDateInRange(training.trainingDate, startWeek, endWeek))
      .sort(sortByTrainingDateDesc)
  }

  getOtherTrainings = trainings => {
    const startWeek = moment().startOf('isoWeek')
    const endWeek = moment().endOf('isoWeek')
    return trainings
      .filter(training => !isDateInRange(training.trainingDate, startWeek, endWeek))
      .sort(sortByTrainingDateAsc)
  }

  render() {
    const { trainings } = this.props
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
                    header={trainingsHeader}
                    data={this.getCurrentWeekTrainings(trainings)}
                    onChange={this.updateTraining}
                    onEdit={() => {
                      console.log('edit')
                    }}
                    onDelete={() => {
                      console.log('delete')
                    }}
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
                    header={trainingsHeader}
                    data={this.getOtherTrainings(trainings)}
                    onChange={this.updateTraining}
                    onEdit={() => {
                      console.log('edit')
                    }}
                    onDelete={() => {
                      console.log('delete')
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  trainings: getTrainings(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTrainings: username => dispatch(fetchTrainingsForUser(username)),
  updateTraining: training => dispatch(updateTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsPage)
