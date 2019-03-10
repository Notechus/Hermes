import React from 'react'
import { connect } from 'react-redux'
import { getTraining } from 'reducers/entities/trainingsReducer'
import { updateRunnerTraining } from 'actions/trainingsActions'
import SingleTrainingView from 'views/Trainings/SingleTrainingPage/SingleTrainingView'
import { sortByActivityOrderAsc } from 'utils/functions'

const TRAININGS_PAGE = '/app/trainings'

class SingleTrainingPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      completed: false,
      modificationTime: '',
      trainingId: '',
      loading: false,
    }
  }

  componentDidMount() {
    const { training, history } = this.props
    if (training) {
      const newState = JSON.parse(JSON.stringify(training))
      newState.activities.forEach(e => {
        e.time = 0
        e.hr = 0
        e.pace = 0
      })
      this.setState({ ...newState })
    } else {
      setTimeout(() => history.push(TRAININGS_PAGE), 1000)
    }
  }

  changeCompleted = () => {
    const { completed } = this.state
    this.setState({ completed: !completed })
  }

  onChange = (field, order, value) => {
    const { activities } = this.state
    const activity = activities.find(e => e.order === order)
    activity[field] = value
    const restActivities = activities.filter(e => e.order !== order)
    this.setState({ activities: [...restActivities, activity].sort(sortByActivityOrderAsc) })
  }

  updateTrainingInfo = e => {
    e.preventDefault()
    const { updateTraining, history } = this.props
    const { activities } = this.state
    activities.forEach(e => {
      if (e.hr) {
        e.hr = Number.parseInt(e.hr)
      }
      if (e.distance) {
        e.distance = Number.parseFloat(e.distance)
      }
    })
    updateTraining({ ...this.state })
      .then()
      .then(() => {})
      .then(() => history.push(TRAININGS_PAGE))
  }

  render() {
    const { training } = this.props
    if (training) {
      const { activities, completed, modificationTime, loading } = this.state
      return (
        <SingleTrainingView
          activities={activities}
          completed={completed}
          modificationTime={modificationTime}
          onUpdate={this.updateTrainingInfo}
          onChange={this.onChange}
          onCompleted={this.changeCompleted}
          loading={loading}
        />
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  training: getTraining(state, ownProps.match.params.id),
})

const mapDispatchToProps = dispatch => ({
  updateTraining: training => dispatch(updateRunnerTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrainingPage)
