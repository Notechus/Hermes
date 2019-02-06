import React from 'react'
// reactstrap components
import { Col, Row } from 'reactstrap'

import { compareOrders } from 'utils/functions'
import { verifyIsPositiveNumber, verifyRangeInclusive } from 'utils/validation'
import ActivitiesTable from 'components/TrainingsNew/ActivitiesTable'
import NewActivityForm from 'components/TrainingsNew/NewActivityForm'

class TrainingActivitiesStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      order: 1,
      distance: 0.0,
      description: '',
      comment: '',
      distanceState: '',
      descriptionState: '',
      commentState: '',
    }
  }

  isValidated = () => {
    return true
  }

  addActivity = () => {
    const { description, comment, order } = this.state
    const distance = Number.parseFloat(this.state.distance)
    this.setState({
      activities: [...this.state.activities, { order, distance, description, comment }].sort(
        (a, b) => compareOrders(a.order, b.order)
      ),
      order: order + 1,
      distance: 0.0,
      description: '',
      comment: '',
    })
  }

  removeActivity = order => {
    const newOrder = this.state.order === 1 ? 1 : this.state.order - 1
    this.setState({
      activities: this.state.activities
        .filter(e => !(e.order === order))
        .map(e => {
          e.order = e.order - 1
          return e
        }),
      order: newOrder,
    })
  }

  changeFocus = (name, value) => {
    this.setState({ [name + 'Focus']: value })
  }

  change = (event, type) => {
    switch (type) {
      case 'distance':
        const val = event.target.value.includes('.')
          ? Number.parseFloat(event.target.value)
          : Number.parseInt(event.target.value)
        if (event.target.value !== '' && verifyIsPositiveNumber(val)) {
          this.setState({ distanceState: 'has-success' })
        } else {
          this.setState({ distanceState: 'has-danger' })
        }
        break
      case 'description':
        if (verifyRangeInclusive(event.target.value.length, 1, 150)) {
          this.setState({ descriptionState: 'has-success' })
        } else {
          this.setState({ descriptionState: 'has-danger' })
        }
        break
      default:
        break
    }
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <>
        <h5 className="info-text">What are the activities?</h5>
        <Row className="justify-content-center">
          <Col lg="10">
            <Row className="justify-content-center">
              <Col sm="12">
                <ActivitiesTable data={this.state.activities} onDelete={this.removeActivity} />
              </Col>
            </Row>
            <Row>
              <Col sm="10">
                <NewActivityForm
                  distance={this.state.distance}
                  distanceState={this.state.distanceState}
                  distanceFocus={this.state.distanceFocus}
                  description={this.state.description}
                  descriptionState={this.state.descriptionState}
                  descriptionFocus={this.state.descriptionFocus}
                  comment={this.state.comment}
                  commentState={this.state.commentState}
                  commentFocus={this.state.commentFocus}
                  onChange={this.change}
                  onFocus={this.changeFocus}
                  onSubmit={this.addActivity}
                />
              </Col>
              <Col sm="6" />
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export default TrainingActivitiesStep
