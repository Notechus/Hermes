import React from 'react'
import moment from 'moment'

export const DashboardUpdateTimeFooter = ({ time }) => {
  return (
    <>
      <i className="fa fa-history" />
      {/*Updated {time ? moment(time).fromNow() : ''}*/}
      Updated {time ? moment().to(time) : ''}
    </>
  )
}

export default DashboardUpdateTimeFooter
