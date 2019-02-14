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
  FormGroup,
  FormText,
  Input,
  Row,
} from 'reactstrap'
import { ConfirmSignUp } from 'aws-amplify-react'
import AuthNavbar from 'components/Navbars/AuthNavbar'
import Footer from 'components/Footer/Footer'
import { Auth } from 'aws-amplify'
import { APPLICATION_VERSION } from 'utils/variables'

class ConfirmRegister extends ConfirmSignUp {
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

  render() {
    const { authState } = this.props
    if (authState !== 'confirmSignUp') {
      return null
    }
    const username = this.usernameFromAuthData()

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
                      <CardTitle tag="h4">Confirm Sign Up</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form action="" className="form" method="">
                        <FormGroup>
                          <Input
                            placeholder="Username"
                            key="username"
                            name="username"
                            onChange={this.handleInputChange}
                            disabled={username}
                            value={username ? username : ''}
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            placeholder="Enter your code"
                            type="text"
                            key="code"
                            name="code"
                            autoComplete="off"
                            onChange={this.handleInputChange}
                          />
                          <FormText color="default" tag="span">
                            Lost your code?{' '}
                            <a href={'#pablo'} onClick={this.resend}>
                              Resend
                            </a>
                          </FormText>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="info"
                          onClick={() => this.changeState('signIn')}
                        >
                          Back to Sign In
                        </Button>
                        <Button className="btn-round" color="success" onClick={this.confirm}>
                          Confirm
                        </Button>
                      </FormGroup>
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

export default ConfirmRegister
