import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";

import { getUser } from "reducers/authorizationDataReducer";
import { updateUserAvatar } from "actions/authorizationActions";
import ImageAvatarUpload from "components/CustomUpload/ImageAvatarUpload.jsx";

class UserProfile extends React.Component {
  state = {};
  componentDidMount() {}

  handleImageChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const { username } = this.props.user;
    this.props.changeAvatar(`${username}-avatar.png`, file);
  };

  render() {
    const user = this.props.user;
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
                      loaded={user.avatar && user.avatar !== "" ? true : false}
                      image={user.avatar}
                      onChange={this.handleImageChange}
                    />
                    <h5 className="title">{user.name + " " + user.surname}</h5>
                    <p className="description">@{user.username}</p>
                  </div>
                  <p className="description text-center">
                    "I like the way you work it <br />
                    No diggity <br />I wanna bag it up"
                  </p>
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
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Type</label>
                          <Input
                            defaultValue={user.type}
                            disabled
                            placeholder="Type"
                            type="text"
                          />
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
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="email">Email address</label>
                          <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={user.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            value={user.name}
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            value={user.surname}
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Melbourne, Australia"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Melbourne"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Australia"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="textarea"
                            type="textarea"
                            cols="80"
                            rows="4"
                            defaultValue="Oh so, your weak rhyme You doubt I'll bother,
                          reading into it"
                          />
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
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
  changeAvatar: (name, file) => dispatch(updateUserAvatar(name, file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
