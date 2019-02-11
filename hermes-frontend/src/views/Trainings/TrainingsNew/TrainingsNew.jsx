import React from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeam } from 'reducers/teamsReducer'
import { createNewTraining } from 'actions/trainingsActions'
import { formatDateAsString } from 'utils/functions'

import ReactWizard from 'react-bootstrap-wizard'
import { Col } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'

import AboutTrainingStep from './Steps/AboutTrainingStep.jsx'
import TrainingActivitiesStep from './Steps/TrainingActivitiesStep.jsx'
import AdditionalInfoStep from './Steps/AdditionalInfoStep.jsx'
import TrainingSummaryStep from './Steps/TrainingSummaryStep.jsx'

const steps = team => [
  {
    stepName: 'About',
    stepIcon: 'nc-icon nc-alert-circle-i',
    component: AboutTrainingStep,
    componentProp: team,
  },
  {
    stepName: 'Activities',
    stepIcon: 'nc-icon nc-user-run',
    component: TrainingActivitiesStep,
  },
  {
    stepName: 'Additional Information',
    stepIcon: 'nc-icon nc-single-copy-04',
    component: AdditionalInfoStep,
  },
  {
    stepName: 'Summary',
    stepIcon: 'nc-icon nc-bookmark-2',
    component: TrainingSummaryStep,
  },
]

class TrainingsNew extends React.Component {
  state = {
    alert: null,
  }

  componentDidMount() {
    const { user, history } = this.props
    if (user && user.type !== 'Coach') {
      history.push('/admin/dashboard')
    }
  }

  successAlert = username => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Good job!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          You have successfully added new training for {username}!
        </ReactBSAlert>
      ),
    })
  }

  hideAlert = () => {
    this.setState({
      alert: null,
    })
    this.props.history.push('/admin/teams')
  }

  createNewTraining = formState => {
    console.log(formState)

    const {
      trainingDate,
      username,
      intensity,
      importance,
      trainingComment,
      activities,
      trainingDescription,
    } = formState

    this.props
      .createTraining({
        runner: username,
        trainingDate: formatDateAsString(trainingDate),
        trainingDescription: trainingDescription,
        activities: activities.map(e =>
          Object.assign(
            {},
            { order: e.order, distance: e.distance, description: e.description },
            e.comment ? { comment: e.comment } : null
          )
        ),
        coachNotes: trainingComment,
        importance: importance,
        intensity: intensity,
      })
      .then(() => this.successAlert(username))
  }

  render() {
    const wizardSteps = steps(this.props.team)
    return (
      <>
        <div className="content">
          {this.state.alert}
          <Col className="ml-auto mr-auto" md="10">
            <ReactWizard
              steps={wizardSteps}
              navSteps
              validate
              title="Add a new training"
              description="Please fill all necessary information"
              headerTextCenter
              finishButtonClasses="btn-wd"
              finishButtonClick={this.createNewTraining}
              nextButtonClasses="btn-wd"
              previousButtonClasses="btn-wd"
            />
          </Col>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  team: getTeam(state),
})

const mapDispatchToProps = dispatch => ({
  createTraining: training => dispatch(createNewTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsNew)
