import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { getUser } from 'reducers/authorizationDataReducer'
import { fetchTrainingsForUser, updateTraining } from 'actions/trainingsActions'
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

  onChange = event => {
    const { training } = this.state
    training[event.target.name] = event.target.value
    this.setState({ training })
  }

  render() {
    const { activePage, training } = this.state

    switch (activePage) {
      case 'trainings':
        return <RunnerTrainingsView onLink={this.changeState} />
      case 'editTraining':
        const { updateTraining } = this.props
        return (
          <SingleTrainingView
            training={training}
            onReturn={this.changeState}
            onUpdate={updateTraining}
            onChange={e => console.log('updating', e)}
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
  updateTraining: training => dispatch(updateTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsPage)
