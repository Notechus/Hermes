import React from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeam } from 'reducers/entities/teamsReducer'
import { createNewTraining } from 'actions/trainingsActions'
import { formatDateAsString } from 'utils/functions'

import ReactWizard from 'react-bootstrap-wizard'
import { Col } from 'reactstrap'

import AboutTrainingStep from './Steps/AboutTrainingStep.jsx'
import TrainingActivitiesStep from './Steps/TrainingActivitiesStep.jsx'
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
    stepName: 'Summary',
    stepIcon: 'nc-icon nc-bookmark-2',
    component: TrainingSummaryStep,
  },
]

class TrainingsNew extends React.Component {
  state = {}

  componentDidMount() {
    const { user, history } = this.props
    if (user && user.type !== 'Coach') {
      history.push('/app/dashboard')
    }
  }

  createNewTraining = formState => {
    console.log(formState)

    const { createTraining, history } = this.props

    const {
      trainingDate,
      username,
      intensity,
      importance,
      trainingComment,
      activities,
      trainingDescription,
    } = formState

    createTraining({
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
    }).then(() => history.push('/app/teams'))
  }

  render() {
    const wizardSteps = steps(this.props.team)
    return (
      <>
        <div className="content">
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
