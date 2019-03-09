import React from 'react'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { NavLink as NavLnk } from 'react-router-dom'
import EventNavbarDropdown from 'components/Navbars/EventNavbarDropdown.jsx'

const isCoachUser = user => user && user.type === 'Coach'

const preventDefault = e => e.preventDefault()

const NavbarRightPanel = ({ user, signOut, collapseOpen }) => {
  return (
    <Collapse className="justify-content-end" navbar isOpen={collapseOpen}>
      <Nav navbar>
        {isCoachUser(user) && (
          <NavItem>
            <NavLnk to="/app/trainings/new">New</NavLnk>
          </NavItem>
        )}
        <EventNavbarDropdown username={user ? user.username : null} />
        <NavItem>
          <NavLink href="#pablo" onClick={preventDefault}>
            <i className="nc-icon nc-settings-gear-65" />
            <p>
              <span className="d-lg-none d-md-block">Account</span>
            </p>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#pablo" onClick={signOut}>
            <i className="nc-icon nc-button-power" />
            <p>
              <span className="d-lg-none d-md-block">Sign out</span>
            </p>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  )
}

export default React.memo(NavbarRightPanel)
