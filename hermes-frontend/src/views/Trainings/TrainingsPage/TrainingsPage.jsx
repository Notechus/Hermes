import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { getUser } from 'reducers/authorizationDataReducer'
import { sortByActivityOrderAsc } from 'utils/functions'
import { fetchTrainingsForUser, updateRunnerTraining } from 'actions/trainingsActions'
import RunnerTrainingsView from 'views/Trainings/TrainingsPage/RunnerTrainingsView.jsx'
import SingleTrainingView from 'views/Trainings/TrainingsPage/SingleTrainingView.jsx'

class TrainingsPage extends React.Component {
  state = {
    activePage: 'trainings',
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

  changeState = (activePage, training) => {
    training &&
      training.activities.forEach(e => {
        if (!e.hr) {
          e.hr = ''
        }
        if (!e.time) {
          e.time = ''
        }
        if (!e.pace) {
          e.pace = ''
        }
      })

    this.setState({ activePage, training })
  }

  markCompleted = training => {
    training.completed = !training.completed
    this.props.updateTraining(training)
  }

  updateTraining = training => {
    training.completed = !training.completed
    this.props.updateTraining(training).then(() => this.toggleModal())
  }

  onChange = (field, order, value) => {
    const { training } = this.state
    const activity = training.activities.find(e => e.order === order)
    console.log('found activity to update', activity)
    activity[field] = value
    const restActivities = training.activities.filter(e => e.order !== order)
    training.activities = [...restActivities, activity].sort(sortByActivityOrderAsc)
    this.setState({ training })
  }

  changeCompleted = () => {
    const { training } = this.state
    training.completed = !training.completed
    this.setState({ training: training })
  }

  updateTrainingInfo = () => {
    const { updateTraining } = this.props
    const { training } = this.state
    console.log('updating training', training)
    updateTraining(training)
  }

  render() {
    const { activePage, training } = this.state

    switch (activePage) {
      case 'trainings':
        return <RunnerTrainingsView onLink={this.changeState} />
      case 'editTraining':
        return (
          <SingleTrainingView
            training={training}
            onReturn={this.changeState}
            onUpdate={this.updateTrainingInfo}
            onChange={this.onChange}
            onCompleted={this.changeCompleted}
          />
        )
      default:
        return null
    }
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTrainings: username => dispatch(fetchTrainingsForUser(username)),
  updateTraining: training => dispatch(updateRunnerTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsPage)
