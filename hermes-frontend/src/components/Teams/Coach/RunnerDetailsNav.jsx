import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

const RunnerDetailsNav = ({ activeTab, toggle }) => {
  return (
    <>
      <div className="nav-tabs-navigation">
        <div className="nav-tabs-wrapper">
          <Nav tabs>
            <NavItem>
              <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => toggle('1')}>
                Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => toggle('2')}>
                Performance
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => toggle('3')}>
                Trainings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => toggle('4')}>
                Personal Note
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === '5' ? 'active' : ''} onClick={() => toggle('5')}>
                Private Notes
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default React.memo(RunnerDetailsNav)
