import React from 'react'
import { connect } from 'react-redux'
import { getTraining } from 'reducers/entities/trainingsReducer'
import { updateTraining } from 'actions/trainingsActions'
import SingleTrainingView from 'views/Trainings/SingleTrainingPage/SingleTrainingView'

const TRAININGS_PAGE = '/app/trainings'

class SingleTrainingPage extends React.PureComponent {
  componentDidMount() {
    const { training, history } = this.props
    if (training) {
      this.setState({ ...training })
    } else {
      setTimeout(() => history.push(TRAININGS_PAGE), 1000)
    }
  }

  changeCompleted = () => {
    const { completed } = this.state
    this.setState({ completed: !completed })
  }

  updateTrainingInfo = e => {
    e.preventDefault()
    const { updateTraining } = this.props
    const { activities } = this.state
    activities.forEach(e => {
      if (e.hr) {
        e.hr = Number.parseInt(e.hr)
      }
      if (e.distance) {
        e.distance = Number.parseFloat(e.distance)
      }
    })
    console.log('updating training', this.state)
    // updateTraining({})
  }

  returnToTrainings = e => {
    e.preventDefault()
    const { history } = this.props
    if (history && history.push) {
      history.push(TRAININGS_PAGE)
    }
  }

  render() {
    const { training } = this.props
    if (training) {
      const { activities, completed, modificationTime } = this.state
      return (
        <SingleTrainingView
          activities={activities}
          completed={completed}
          modificationTime={modificationTime}
          onReturn={this.returnToTrainings}
          onUpdate={this.updateTrainingInfo}
          onChange={this.onChange}
          onCompleted={this.changeCompleted}
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
  updateTraining: training => dispatch(updateTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrainingPage)
