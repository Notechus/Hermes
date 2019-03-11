import React from 'react'
import { connect } from 'react-redux'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap'

import { EMPTY_USER, getUser } from 'reducers/authorizationDataReducer'
import { updateUser, updateUserAvatar, fetchAuthorizedUser } from 'actions/authorizationActions'
import ImageAvatarUpload from 'components/CustomUpload/ImageAvatarUpload.jsx'
import Select from 'react-select'

class UserProfile extends React.Component {
  state = { ...EMPTY_USER, updating: false }

  componentDidMount() {
    const { user } = this.props
    this.setState({
      ...user,
      gender: { value: user.gender, label: user.gender },
    })
  }

  handleImageChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const { userId } = this.props.user
    this.props.changeAvatar(userId, file)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdate = () => {
    const { firstName, lastName, gender, about, memo, email } = this.state
    this.setState({ updating: true })
    const userToUpdate = {
      firstName,
      lastName,
      gender: gender.value,
      about,
      memo,
      email,
    }
    console.log('trying to update user attributes', userToUpdate)
    this.props.updateUser(userToUpdate).then(() => this.setState({ updating: false }))
  }

  render() {
    const { user } = this.props
    const { firstName, lastName, gender, about, memo, email, updating } = this.state
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image" />
                <CardBody>
                  <div className="author">
                    <ImageAvatarUpload userId={user.userId} onChange={this.handleImageChange} />
                    <h5 className="title">{user.firstName + ' ' + user.lastName}</h5>
                    <p className="description">@{user.username}</p>
                  </div>
                  <p className="description text-center">{user.memo}</p>
                </CardBody>
                <CardFooter />
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>Type</label>
                          <Input defaultValue={user.type} disabled placeholder="Type" type="text" />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            disabled
                            defaultValue={user.username}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup>
                          <label htmlFor="email">Email address</label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            name="firstName"
                            value={firstName}
                            placeholder="First Name"
                            type="text"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            name="lastName"
                            value={lastName}
                            placeholder="Last Name"
                            type="text"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Gender</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="gender"
                            value={gender}
                            onChange={v => this.setState({ gender: v })}
                            options={[
                              { value: 'Male', label: 'Male' },
                              { value: 'Female', label: 'Female' },
                            ]}
                            placeholder="Gender"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Memo</label>
                          <Input
                            name="memo"
                            value={memo}
                            placeholder="Memo"
                            type="text"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            name="about"
                            className="textarea"
                            type="textarea"
                            cols="80"
                            rows="4"
                            value={about}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Button onClick={this.handleUpdate} disabled={updating}>
                            Update
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  changeAvatar: (userId, file) => dispatch(updateUserAvatar(userId, file)),
  updateUser: attributes => dispatch(updateUser(attributes)),
  fetchUser: () => dispatch(fetchAuthorizedUser),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
