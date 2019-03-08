import React from 'react'
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import EventNavbarDropdown from 'components/Navbars/EventNavbarDropdown.jsx'

const isCoachUser = user => user && user.type === 'Coach'

const NavbarRightPanel = ({ user, signOut, collapseOpen, newTraining }) => {
  return (
    <Collapse className="justify-content-end" navbar isOpen={collapseOpen}>
      <Nav navbar>
        {isCoachUser(user) && (
          <NavItem>
            <NavLink href="#new" onClick={newTraining}>
              New
            </NavLink>
          </NavItem>
        )}
        <EventNavbarDropdown username={user ? user.username : null} />
        <NavItem>
          <NavLink href="#pablo">
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
