import React from 'react'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap'
import { SignUp } from 'aws-amplify-react'
import Select from 'react-select'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import Footer from 'components/Footer/Footer'
import countryDialCodes from 'utils/countryDialCodes'
import { Auth } from 'aws-amplify'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import { APPLICATION_VERSION } from 'utils/variables'

const SIGNUP_DISABLED = true

class Register extends SignUp {
  componentDidMount() {
    document.body.classList.toggle('register-page')
    if (SIGNUP_DISABLED) {
      this.warningWithConfirmMessage()
    }
  }

  componentWillUnmount() {
    document.body.classList.toggle('register-page')
    if (SIGNUP_DISABLED) {
      this.hideAlert()
    }
  }

  signUp() {
    if (SIGNUP_DISABLED) {
      this.warningWithConfirmMessage()
      return
    }

    if (!this.inputs.dial_code || this.inputs.dial_code === '') {
      this.inputs.dial_code = this.getDefaultDialCode()
    }
    const validation = this.validate()
    if (validation && validation.length > 0) {
      return this.error(`The following fields need to be filled out: ${validation.join(', ')}`)
    }
    if (!Auth || typeof Auth.signUp !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }

    const { username, password, dial_code, phone_line_number, name, surname, email } = this.inputs

    const signupInfo = {
      username: username,
      password: password,
      attributes: {
        phone_number: `${dial_code}${phone_line_number.replace(/[-()]/g, '')}`,
        name: name || '',
        email: email,
        'custom:surname': surname || '',
      },
    }

    Auth.signUp(signupInfo)
      .then(data => {
        this.changeState('confirmSignUp', data.user.username)
      })
      .catch(err => this.error(err))
  }

  hideAlert = () => {
    this.setState({ alert: null })
  }

  warningWithConfirmMessage = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Sign up is currently disabled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="Ok"
          cancelBtnText="Cancel"
          showCancel
        />
      ),
    })
  }

  render() {
    const { authState } = this.props
    if (authState !== 'signUp') {
      return null
    }

    if (this.checkCustomSignUpFields()) {
      this.signUpFields = this.props.signUpConfig.signUpFields
    }
    this.sortFields()

    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
        {this.state.alert}
        <div className="full-page section-image">
          <AuthNavbar signUp={false} signIn={true} changeState={this.changeState} />
          <div className="register-page">
            <Container>
              <Row>
                <Col className="mr-auto ml-auto" lg="5" md="7">
                  <Card className="card-signup text-center">
                    <CardHeader>
                      <CardTitle tag="h4">Sign Up</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form action="" className="form" method="">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your username"
                            type="text"
                            key="username"
                            name="username"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your password"
                            key="password"
                            type="password"
                            name="password"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your email"
                            key="email"
                            name="email"
                            type="email"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <Col md={4}>
                            <Select
                              className="react-select primary"
                              classNamePrefix="react-select"
                              name="dial_code"
                              placeholder="Dial code"
                              defaultValue={this.getDefaultDialCode()}
                              onChange={code =>
                                this.handleInputChange({
                                  target: {
                                    name: 'dial_code',
                                    value: code.value,
                                  },
                                })
                              }
                              options={['', ...countryDialCodes].map(code => ({
                                value: code,
                                label: code,
                              }))}
                            />
                          </Col>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-tablet-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your phone number"
                            key="phone_line_number"
                            name="phone_line_number"
                            type="text"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your first name"
                            key="name"
                            name="name"
                            type="text"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-circle-10" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Enter your last name"
                            key="surname"
                            name="surname"
                            type="text"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                        <FormGroup check className="text-left">
                          <Label check>
                            <Input defaultChecked type="checkbox" />
                            <span className="form-check-sign" />I agree to the{' '}
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="info"
                        href="#pablo"
                        onClick={this.signUp}
                      >
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
            <div
              className="full-page-background"
              style={{
                backgroundImage: `url(${require('../../assets/img/bg/jan-sendereks.jpg')})`,
              }}
            />
          </div>
          <Footer fluid version={APPLICATION_VERSION} />
        </div>
      </div>
    )
  }
}

export default Register
