import React from 'react'
import moment from 'moment'
import { DATETIME_FORMAT } from 'utils/functions'

const NavbarDropdownItem = ({ message, time }) => {
  return (
    <>
      <div className="ml-auto">{message}</div>
      <div className="ml-auto">
        <small>{moment(time).format(DATETIME_FORMAT)}</small>
      </div>
    </>
  )
}

export default React.memo(NavbarDropdownItem)
