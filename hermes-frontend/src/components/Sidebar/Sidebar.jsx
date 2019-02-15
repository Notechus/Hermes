import React from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, Nav } from 'reactstrap'
import PerfectScrollbar from 'perfect-scrollbar'

import logo from 'assets/img/react-logo.png'
import defaultImage from 'assets/img/default-avatar.png'
import { S3Image } from 'aws-amplify-react'

let ps

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getCollapseStates(props.routes)
  }

  getCollapseStates = routes => {
    let initialState = {}
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState,
        }
      }
      return null
    })
    return initialState
  }

  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true
      }
    }
    return false
  }

  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect || prop.hidden) {
        return null
      }
      if (prop.collapse) {
        let st = {}
        st[prop['state']] = !this.state[prop.state]
        return (
          <li className={this.getCollapseInitialState(prop.views) ? 'active' : ''} key={key}>
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              onClick={e => {
                e.preventDefault()
                this.setState(st)
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        )
      }
      return (
        <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="">
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      )
    })
  }

  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy()
    }
  }

  render() {
    const user = this.props.user
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a href="/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a href="/" className="simple-text logo-normal">
            Hermes
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <div className="user">
            <div className="photo">
              {user.avatar && user.avatar !== '' ? (
                <S3Image imgKey={user.avatar} level="protected" className="picture-src" />
              ) : (
                <img src={defaultImage} alt="Avatar" />
              )}
            </div>
            <div className="info justify-content-center pl-4">
              <NavLink to="/app/user-profile" activeClassName="">
                <span>{user ? user.username : 'Unknown User'}</span>
              </NavLink>
            </div>
          </div>
          <Nav>{this.createLinks(this.props.routes)}</Nav>
        </div>
      </div>
    )
  }
}

export default Sidebar
