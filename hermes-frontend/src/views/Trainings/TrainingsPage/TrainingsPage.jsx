import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import { getUser } from 'reducers/authorizationDataReducer'
import {
  getCurrentWeekTrainingIdsSelect,
  getTrainingIdsExceptCurrentWeekSelect,
} from 'reducers/entities/trainingsReducer'
import { sortByActivityOrderAsc } from 'utils/functions'
import { updateRunnerTraining } from 'actions/trainingsActions'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TrainingsTable from 'components/TrainingsTable/TrainingsTable'

class TrainingsPage extends React.Component {
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

    this.setState({ activePage, training: training ? Object.assign({}, training) : null })
  }

  onChange = (field, order, value) => {
    const { activities } = this.state
    const activity = activities.find(e => e.order === order)
    activity[field] = value
    const restActivities = activities.filter(e => e.order !== order)
    this.setState({ activities: [...restActivities, activity].sort(sortByActivityOrderAsc) })
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

  render() {
    const { currentWeek, trainings } = this.props
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
                  <TrainingsTable ids={currentWeek ? currentWeek : []} />
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
                  <TrainingsTable ids={trainings ? trainings : []} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  const getCurrentWeekTrainings = getCurrentWeekTrainingIdsSelect()
  const getTrainingsExceptCurrentWeek = getTrainingIdsExceptCurrentWeekSelect()
  return {
    user: getUser(state),
    currentWeek: getCurrentWeekTrainings(state),
    trainings: getTrainingsExceptCurrentWeek(state),
  }
}

const mapDispatchToProps = dispatch => ({
  updateTraining: training => dispatch(updateRunnerTraining(training)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsPage)
