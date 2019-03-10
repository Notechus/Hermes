import React from 'react'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import ApplicationNavbar from 'components/Navbars/ApplicationNavbar.jsx'
import Notifications from 'components/Notifications/Notifications.jsx'
import Footer from 'components/Footer/Footer.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'
import { fetchAuthorizedUser } from 'actions/authorizationActions'

import routes from 'routes.js'
import { getUser } from 'reducers/authorizationDataReducer'
import { APPLICATION_VERSION } from 'utils/variables'

let ps

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'black',
      activeColor: 'info',
      sidebarMini: false,
    }
  }
  componentDidMount() {
    this.props.fetchUser()
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on'
      document.documentElement.classList.remove('perfect-scrollbar-off')
      ps = new PerfectScrollbar(this.refs.mainPanel)
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
      document.documentElement.className += ' perfect-scrollbar-off'
      document.documentElement.classList.remove('perfect-scrollbar-on')
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0
      document.scrollingElement.scrollTop = 0
      this.refs.mainPanel.scrollTop = 0
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views)
      }
      if (prop.layout === '/app') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />
      } else {
        return null
      }
    })
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          user={this.props.user}
        />
        <div className="main-panel" ref="mainPanel">
          <Notifications />
          <ApplicationNavbar
            {...this.props}
            onStateChange={this.props.onStateChange}
            user={this.props.user}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Footer fluid version={APPLICATION_VERSION} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchAuthorizedUser),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
