import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTrainings } from 'reducers/trainingsReducer'
import { fetchTrainingsForUser, updateTraining } from 'actions/trainingsActions'
import TrainingsTable from 'components/TrainingsTable/TrainingsTable'
import SingleTrainingPage from 'components/SingleTrainingPage/SingleTrainingPage'
import moment from 'moment'
import { sortByTrainingDateAsc, sortByTrainingDateDesc, isDateInRange } from 'utils/functions'
import ReactBSAlert from 'react-bootstrap-sweetalert'

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
  state = {
    alert: null,
    openedModal: false,
  }

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

  hideAlert = () => {
    this.setState({
      alert: null,
    })
  }

  warningWithConfirmMessage = training => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Are you sure?"
          onConfirm={() => this.removeTraining(training)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this training!
        </ReactBSAlert>
      ),
    })
  }

  markCompleted = training => {
    // this.openModal(training)
    training.completed = !training.completed
    this.props.updateTraining(training) //.then(() => this.toggleModal())
  }

  removeTraining = training => {
    console.log('removing ', training)
    // this.props.removeTraining(training).then(() => this.hideAlert())
    this.hideAlert()
  }

  updateTraining = training => {
    training.completed = !training.completed
    this.props.updateTraining(training).then(() => this.toggleModal())
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

  toggleModal = () => {
    const { openedModal } = this.state
    this.setState({ openedModal: !openedModal, training: null })
  }

  openModal = training => {
    console.log('opening modal', training)
    this.setState({ openedModal: true, training: training })
  }

  onChange = event => {
    const { training } = this.state
    training[event.target.name] = event.target.value
    this.setState({ training })
  }

  render() {
    const { trainings } = this.props
    const { training } = this.state
    return (
      <>
        <div className="content">
          {this.state.alert}
          <SingleTrainingPage
            opened={this.state.openedModal}
            training={training}
            onChange={this.onChange}
            toggle={this.toggleModal}
            save={this.updateTraining}
          />
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
                    onChange={this.markCompleted}
                    onDelete={this.warningWithConfirmMessage}
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
                    onChange={this.markCompleted}
                    onDelete={this.warningWithConfirmMessage}
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
