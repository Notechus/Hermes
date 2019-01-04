import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

import AuthNavbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footer/Footer";
import { ForgotPassword, SignIn, SignUp } from "aws-amplify-react";

class Login extends SignIn {
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    document.body.classList.toggle("login-page");
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    document.body.classList.toggle("login-page");
  }

  onKeyDown = e => {
    if (e.keyCode !== 13) return;

    const { hide = [] } = this.props;
    if (this.props.authState === "signIn" && !hide.includes(Login)) {
      this.signIn();
    }
  };

  render() {
    const { hide = [], override = [] } = this.props;
    if (this.props.authState !== "signIn") {
      return null;
    }
    const showSignUp =
      override.includes("SignUp") ||
      !hide.some(component => component === SignUp);
    const showForgotPassword =
      override.includes("ForgotPassword") ||
      !hide.some(component => component === ForgotPassword);
    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
        <div className="full-page section-image">
          <AuthNavbar signUp={showSignUp} changeState={this.changeState} />
          <div className="login-page">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Form action="" className="form" method="">
                    <Card className="card-login">
                      <CardHeader>
                        <CardHeader>
                          <h3 className="header text-center">Login</h3>
                        </CardHeader>
                      </CardHeader>
                      <CardBody>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="nc-icon nc-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username"
                            key="username"
                            name="username"
                            type="text"
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
                            key="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={this.handleInputChange}
                          />
                        </InputGroup>
                      </CardBody>
                      <CardFooter>
                        <Row>
                          <Col md={12} lg={12} sm={12}>
                            <Button
                              block
                              className="btn-round mb-3"
                              color="success"
                              href="#pablo"
                              onClick={this.signIn}
                              disabled={this.state.loading}
                            >
                              Sign in
                            </Button>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col md={12} lg={12} sm={12}>
                            {showForgotPassword && (
                              <a
                                href="#pablo"
                                onClick={() =>
                                  this.changeState("forgotPassword")
                                }
                              >
                                Forget your password?
                                <span>Reset password</span>
                              </a>
                            )}
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Container>
            <div
              className="full-page-background"
              style={{
                backgroundImage: `url(${require("../../assets/img/bg/fabio-mangione.jpg")})`
              }}
            />
          </div>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Login;
