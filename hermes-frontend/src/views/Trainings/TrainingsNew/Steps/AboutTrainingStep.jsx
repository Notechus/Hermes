import React from 'react'
import classnames from 'classnames'
// reactstrap components
import { Col, FormGroup, Input, Row } from 'reactstrap'
import { Storage } from 'aws-amplify'
import ReactDatetime from 'react-datetime'
// core components
import ImageAvatar from 'components/TrainingsNew/ImageAvatar.jsx'
import UsernameFromTeamDropdown from 'components/TrainingsNew/UsernameFromTeamDropdown.jsx'
import { verifyFutureDate, verifyLength, verifyRangeInclusive } from 'utils/validation'

class AboutTrainingStep extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      memberId: '',
      username: '',
      trainingDescription: '',
      trainingDate: '',
      memberAvatar: '',
      usernameState: '',
      trainingDescriptionState: '',
      trainingDateState: '',
    }
  }

  change = (event, stateName, type, value1, value2) => {
    switch (type) {
      case 'date':
        if (verifyFutureDate(event.target.value)) {
          this.setState({ [stateName + 'State']: 'has-success' })
        } else {
          this.setState({ [stateName + 'State']: 'has-danger' })
        }
        break
      case 'length':
        if (verifyLength(event.target.value, value1)) {
          this.setState({ [stateName + 'State']: 'has-success' })
        } else {
          this.setState({ [stateName + 'State']: 'has-danger' })
        }
        break
      case 'range':
        if (verifyRangeInclusive(event.target.value.length, value1, value2)) {
          this.setState({ [stateName + 'State']: 'has-success' })
        } else {
          this.setState({ [stateName + 'State']: 'has-danger' })
        }
        break
      default:
        break
    }
    this.setState({ [stateName]: event.target.value })
  }

  isValidated = () => {
    if (this.state.trainingDateState === 'has-success') {
      return true
    } else {
      if (this.state.trainingDateState !== 'has-success') {
        this.setState({ trainingDateState: 'has-danger' })
      }
      if (this.state.trainingDescriptionState !== 'has-success') {
        this.setState({ trainingDescriptionState: 'has-danger' })
      }
      return false
    }
  }

  setUsername = user => {
    console.log('setting username and avatar', user)
    this.setState({
      username: user.value,
      memberId: user.id,
    })
    Storage.get(user.value + '-avatar.png', { level: 'protected', identityId: user.id }).then(
      url => {
        this.setState({
          memberAvatar: url,
        })
      }
    )
  }

  render() {
    return (
      <>
        <h5 className="info-text">Let's start with the basic information</h5>
        <Row className="justify-content-center">
          <Col sm="3">
            <ImageAvatar src={this.state.memberAvatar} />
            <UsernameFromTeamDropdown
              username={this.state.username}
              memberId={this.state.memberId}
              onChange={this.setUsername}
            />
          </Col>
          <Col sm="4" className="mt-4 pt-1">
            <FormGroup
              className={classnames(this.state.trainingDateState, {
                'input-group-focus': this.state.trainingDateFocus,
              })}
            >
              <ReactDatetime
                inputProps={{ className: 'form-control', placeholder: 'Training Date (required)' }}
                timeFormat={false}
                isValidDate={verifyFutureDate}
                onChange={date => {
                  if (verifyFutureDate(date)) {
                    this.setState({ trainingDate: date, trainingDateState: 'has-success' })
                  } else {
                    this.setState({ trainingDateState: 'has-danger' })
                  }
                }}
                dateFormat="YYYY-MM-DD"
                closeOnSelect={true}
                value={this.state.trainingDate}
              />
              {this.state.trainingDateState === 'has-danger' && (
                <label className="error">This field is required.</label>
              )}
            </FormGroup>
            <FormGroup
              className={classnames(this.state.trainingDescriptionState, {
                'input-group-focus': this.state.trainingDescriptionFocus,
              })}
            >
              <Input
                name="trainingDescription"
                type="textarea"
                placeholder="Description"
                value={this.state.trainingDescription}
                onChange={e => this.change(e, 'trainingDescription', 'range', 2, 150)}
                onFocus={() => this.setState({ trainingDescriptionFocus: true })}
                onBlur={() => this.setState({ trainingDescriptionFocus: false })}
              />
              {this.state.trainingDescriptionState === 'has-danger' && (
                <label className="error">
                  This field is required and must be between 1 and 150 characters.
                </label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </>
    )
  }
}

export default AboutTrainingStep
