import React from 'react'

const NavbarDropdownItem = ({ message, time }) => {
  return (
    <>
      <div className="ml-auto">{message}</div>
      <div className="ml-auto">
        <small>{time}</small>
      </div>
    </>
  )
}

export default React.memo(NavbarDropdownItem)
