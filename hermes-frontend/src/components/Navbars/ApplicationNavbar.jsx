import React from 'react'
import classnames from 'classnames'
import { Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap'
import { Auth } from 'aws-amplify'
import EventNavbarDropdown from 'components/Navbars/EventNavbarDropdown'

class ApplicationNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent',
    }
  }

  componentDidMount() {
    this._isMounted = true
    window.addEventListener('resize', this.updateColor)
  }

  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('resize', this.updateColor)
  }

  componentDidUpdate(e) {
    if (!this._isMounted) {
      return
    }
    if (
      window.outerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
    }
  }

  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: 'bg-white',
      })
    } else {
      this.setState({
        color: 'navbar-transparent',
      })
    }
  }

  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
  }

  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen,
    }
    if (!this.state.collapseOpen) {
      newState['color'] = 'bg-white'
    } else {
      newState['color'] = 'navbar-transparent'
    }
    this.setState(newState)
  }

  backToDashboard = () => {}

  isCoachUser = user => user && user.type === 'Coach'

  render() {
    const { user } = this.props

    return (
      <>
        <Navbar className={classnames('navbar-absolute fixed-top', this.state.color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-minimize">
                <Button
                  className="btn-icon btn-round"
                  color="default"
                  id="minimizeSidebar"
                  onClick={this.backToDashboard}
                >
                  <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                  <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
                </Button>
              </div>
              <div
                className={classnames('navbar-toggle', {
                  toggled: this.state.sidebarOpen,
                })}
              >
                <button className="navbar-toggler" type="button" onClick={this.toggleSidebar}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                <span className="d-none d-md-block">Dashboard</span>
                <span className="d-block d-md-none">Dashboard</span>
              </NavbarBrand>
            </div>
            <button
              aria-controls="navigation-index"
              aria-expanded={this.state.collapseOpen}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              // data-target="#navigation"
              data-toggle="collapse"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse className="justify-content-end" navbar isOpen={this.state.collapseOpen}>
              <Nav navbar>
                {this.isCoachUser(user) && (
                  <NavItem>
                    <NavLink
                      href="#new"
                      onClick={e =>
                        e.preventDefault() || this.props.history.push('/app/trainings/new')
                      }
                    >
                      New
                    </NavLink>
                  </NavItem>
                )}
                <EventNavbarDropdown username={user ? user.username : null} />
                <NavItem>
                  <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                    <i className="nc-icon nc-settings-gear-65" />
                    <p>
                      <span className="d-lg-none d-md-block">Account</span>
                    </p>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#pablo"
                    onClick={() =>
                      Auth.signOut()
                        .then(() => this.props.onStateChange('signedOut', {}))
                        .catch(err => console.log(err))
                    }
                  >
                    <i className="nc-icon nc-button-power" />
                    <p>
                      <span className="d-lg-none d-md-block">Sign out</span>
                    </p>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    )
  }
}

export default ApplicationNavbar
