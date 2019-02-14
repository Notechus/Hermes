import React from 'react'
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Label,
  FormGroup,
  FormText,
  Input,
  Row,
} from 'reactstrap'
import { ForgotPassword } from 'aws-amplify-react'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import Footer from 'components/Footer/Footer'
import { Auth } from 'aws-amplify'

class Forgot extends ForgotPassword {
  componentDidMount() {
    document.body.classList.toggle('register-page')
  }

  componentWillUnmount() {
    document.body.classList.toggle('register-page')
  }

  confirm = () => {
    const username = this.usernameFromAuthData() || this.inputs.username
    const { code } = this.inputs
    if (!Auth || typeof Auth.confirmSignUp !== 'function') {
      throw new Error('No Auth module found, please ensure @aws-amplify/auth is imported')
    }

    Auth.confirmSignUp(username, code)
      .then(() => this.changeState('signIn'))
      .catch(err => this.error(err))
  }

  sendView = () => {
    return (
      <>
        <FormGroup>
          <Label for="username">Username*</Label>
          <Input
            placeholder="Enter your username"
            key="username"
            name="username"
            id="username"
            onChange={this.handleInputChange}
            type="text"
          />
        </FormGroup>
      </>
    )
  }

  submitView = () => {
    return (
      <>
        <FormGroup>
          <Input
            placeholder="Code"
            key="code"
            name="code"
            onChange={this.handleInputChange}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="New password"
            key="password"
            name="password"
            onChange={this.handleInputChange}
            type="password"
          />
        </FormGroup>
      </>
    )
  }

  render() {
    const { authState, authData = {} } = this.props
    if (authState !== 'forgotPassword') {
      return null
    }
    const { delivery } = this.state

    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
        <div className="full-page section-image">
          <AuthNavbar signUp={false} signIn={true} changeState={this.changeState} />
          <div className="register-page">
            <Container>
              <Row>
                <Col className="mr-auto ml-auto" lg="5" md="7">
                  <Card className="card-signup text-center">
                    <CardHeader>
                      <CardTitle tag="h4">Reset your password</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form action="" className="form" method="">
                        {delivery || authData.username ? this.submitView() : this.sendView()}
                        <FormGroup>
                          {delivery || authData.username ? (
                            <Button className="btn-round" color="info" onClick={this.submit}>
                              Submit
                            </Button>
                          ) : (
                            <Button className="btn-round" color="success" onClick={this.send}>
                              Send Code
                            </Button>
                          )}
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      {delivery || authData.username ? (
                        <FormText color="default" tag="span">
                          <a href={'#pablo'} onClick={this.send}>
                            Resend Code
                          </a>
                        </FormText>
                      ) : (
                        <FormText color="default" tag="span">
                          <a href={'#pablo'} onClick={() => this.changeState('signIn')}>
                            Back to Sign In
                          </a>
                        </FormText>
                      )}
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
          <Footer fluid />
        </div>
      </div>
    )
  }
}

export default Forgot
