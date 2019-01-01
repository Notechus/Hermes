import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
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
    const { current } = this.props;
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
                <NavLink to="/admin/dashboard" className="nav-link">
                  <i className="nc-icon nc-layout-11" />
                  Dashboard
                </NavLink>
              </NavItem>
              {current !== "/auth/register" && (
                <NavItem>
                  <NavLink to="/auth/register" className="nav-link">
                    <i className="nc-icon nc-book-bookmark" />
                    Register
                  </NavLink>
                </NavItem>
              )}
              {current !== "/auth/login" && (
                <NavItem>
                  <NavLink to="/auth/login" className="nav-link">
                    <i className="nc-icon nc-tap-01" />
                    Login
                  </NavLink>
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
