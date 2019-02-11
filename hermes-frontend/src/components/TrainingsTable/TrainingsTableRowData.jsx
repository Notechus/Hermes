import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DAY_FORMAT } from 'utils/functions'

const TrainingsTableRowData = ({ row, onChange }) => {
  return (
    <>
      <td className="text-left">
        <a href="#edit" onClick={e => e.preventDefault() || onChange()}>
          {row.trainingDate}
        </a>
      </td>
      <td className="text-left">{moment(row.trainingDate).format(DAY_FORMAT)}</td>
      <td className="text-center">{row.completed && <i className="nc-icon nc-check-2" />}</td>
      <td className="text-center">{row.description}</td>
      <td className="text-center">{row.coachNotes}</td>
      <td className="text-center">{row.coach}</td>
    </>
  )
}

TrainingsTableRowData.propTypes = {
  row: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TrainingsTableRowData
