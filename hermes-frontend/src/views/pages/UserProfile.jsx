import React from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
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
  state = { ...EMPTY_USER }

  componentDidMount() {
    this.props.fetchUser()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isEqual(this.props.user, prevProps.user)) {
      this.setState({
        ...this.props.user,
        gender: { value: this.props.user.gender, label: this.props.user.gender },
      })
    }
  }

  handleImageChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const { username } = this.props.user
    this.props.changeAvatar(`${username}-avatar.png`, file)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdate = () => {
    const { name, surname, gender, about, memo } = this.state

    const userToUpdate = {
      name: name,
      'custom:surname': surname,
      gender: gender.value,
      'custom:about': about,
      'custom:memo': memo,
    }
    this.props.updateUser(userToUpdate)
  }

  render() {
    const user = this.props.user
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image" />
                <CardBody>
                  <div className="author">
                    <ImageAvatarUpload
                      loaded={!!(user.avatar && user.avatar !== '')}
                      image={user.avatar}
                      onChange={this.handleImageChange}
                    />
                    <h5 className="title">{user.name + ' ' + user.surname}</h5>
                    <p className="description">@{user.username}</p>
                  </div>
                  <p className="description text-center">{user.memo}</p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
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
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Type</label>
                          <Input defaultValue={user.type} placeholder="Type" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
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
                      <Col className="pl-1" md="5">
                        <FormGroup>
                          <label htmlFor="email">Email address</label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            name="name"
                            value={this.state.name}
                            placeholder="First Name"
                            type="text"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            name="surname"
                            value={this.state.surname}
                            placeholder="Last Name"
                            type="text"
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Gender</label>
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="gender"
                            value={this.state.gender}
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
                            value={this.state.memo}
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
                            value={this.state.about}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Button onClick={this.handleUpdate}>Update</Button>
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
  changeAvatar: (name, file) => dispatch(updateUserAvatar(name, file)),
  updateUser: attributes => dispatch(updateUser(attributes)),
  fetchUser: () => dispatch(fetchAuthorizedUser),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)
