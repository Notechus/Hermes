import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem
} from "reactstrap";

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }

  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen
    };
    if (!this.state.collapseOpen) {
      newState["color"] = "bg-white";
    } else {
      newState["color"] = "navbar-transparent";
    }
    this.setState(newState);
  };
  render() {
    return (
      <Navbar
        className={classnames("navbar-absolute fixed-top", this.state.color)}
        expand="lg"
      >
        <Container>
          <div className="navbar-wrapper">
            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
              Hermes
            </NavbarBrand>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            isOpen={this.state.collapseOpen}
            className="justify-content-end"
            navbar
          >
            <Nav navbar>
              <NavItem>
                <a href="/app/dashboard" className="nav-link">
                  <i className="nc-icon nc-layout-11" />
                  Dashboard
                </a>
              </NavItem>
              {this.props.signUp && (
                <NavItem>
                  <a
                    href="#pablo"
                    className="nav-link"
                    onClick={() => this.props.changeState("signUp")}
                  >
                    <i className="nc-icon nc-book-bookmark" />
                    Sign Up
                  </a>
                </NavItem>
              )}
              {this.props.signIn && (
                <NavItem>
                  <a
                    href="#pablo"
                    className="nav-link"
                    onClick={() => this.props.changeState("signIn")}
                  >
                    <i className="nc-icon nc-book-bookmark" />
                    Sign In
                  </a>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AuthNavbar;
