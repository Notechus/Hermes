import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Container, Navbar, NavbarBrand } from 'reactstrap'
import { Auth } from 'aws-amplify'
import NavbarRightPanel from 'components/Navbars/NavbarRightPanel.jsx'
import { loadUserRelatedData } from 'actions/authorizationActions'
import { getUser } from 'reducers/authorizationDataReducer'
import { dispatchNotification } from 'actions/notificationsActions'

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

  reloadData = e => {
    e.preventDefault()
    const { user, reloadData } = this.props
    console.log('reloading data', user, reloadData)
    reloadData(user.userId, user.username, user.type)
  }

  signOut = e => {
    e.preventDefault()
    Auth.signOut()
      .then(() => this.props.onStateChange('signedOut', {}))
      .catch(err => console.log(err))
  }

  render() {
    const { color, sidebarOpen, collapseOpen } = this.state

    return (
      <>
        <Navbar className={classnames('navbar-absolute fixed-top', color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classnames('navbar-toggle', {
                  toggled: sidebarOpen,
                })}
              >
                <button className="navbar-toggler" type="button" onClick={this.toggleSidebar}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo">
                <span className="d-none d-md-block">Dashboard</span>
                <span className="d-block d-md-none">Dashboard</span>
              </NavbarBrand>
            </div>
            <button
              aria-controls="navigation-index"
              aria-expanded={collapseOpen}
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
            <NavbarRightPanel
              user={this.props.user}
              reloadData={this.reloadData}
              collapseOpen={collapseOpen}
              notify={this.props.dispatchNotification}
              signOut={this.signOut}
            />
          </Container>
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  reloadData: (userId, username, userType) =>
    dispatch(loadUserRelatedData(userId, username, userType)),
  dispatchNotification: (message, type) => dispatch(dispatchNotification(message, type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationNavbar)
