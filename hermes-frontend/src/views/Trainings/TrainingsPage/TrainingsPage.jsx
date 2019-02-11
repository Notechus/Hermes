import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { getUser } from 'reducers/authorizationDataReducer'
import { sortByActivityOrderAsc } from 'utils/functions'
import { fetchTrainingsForUser, updateRunnerTraining } from 'actions/trainingsActions'
import RunnerTrainingsView from 'views/Trainings/TrainingsPage/RunnerTrainingsView.jsx'
import SingleTrainingView from 'views/Trainings/TrainingsPage/SingleTrainingView.jsx'
import ReactBSAlert from 'react-bootstrap-sweetalert'

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
          e.hr = '0'
        }
        if (!e.time) {
          e.time = '0'
        }
        if (!e.pace) {
          e.pace = '0'
        }
      })

    this.setState({ activePage, training })
  }

  onChange = (field, order, value) => {
    const { training } = this.state
    const activity = training.activities.find(e => e.order === order)
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
    updateTraining(training).then(() => this.successAlert())
  }

  successAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="You have successfully updated training!"
          onConfirm={() => {
            this.changeState('trainings', null)
            this.hideAlert()
          }}
          onCancel={() => {
            this.changeState('trainings', null)
            this.hideAlert()
          }}
          confirmBtnBsStyle="info"
        />
      ),
    })
  }

  hideAlert = () => {
    this.setState({ alert: null })
  }

  render() {
    const { activePage, training, alert } = this.state

    switch (activePage) {
      case 'trainings':
        return (
          <>
            {alert}
            <RunnerTrainingsView onLink={this.changeState} />
          </>
        )
      case 'editTraining':
        return (
          <>
            {alert}
            <SingleTrainingView
              training={training}
              onReturn={this.changeState}
              onUpdate={this.updateTrainingInfo}
              onChange={this.onChange}
              onCompleted={this.changeCompleted}
            />
          </>
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
