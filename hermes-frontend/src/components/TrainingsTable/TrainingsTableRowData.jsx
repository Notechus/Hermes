import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { getTraining } from 'reducers/entities/trainingsReducer'
import { DAY_FORMAT } from 'utils/functions'

const TrainingsTableRowData = ({ trainingId, training }) => {
  return (
    <>
      <td className="text-left">
        <a href="#edit" onClick={e => e.preventDefault()}>
          {training.trainingDate}
        </a>
      </td>
      <td className="text-left">{moment(training.trainingDate).format(DAY_FORMAT)}</td>
      <td className="text-center">{training.completed && <i className="nc-icon nc-check-2" />}</td>
      <td className="text-center">{training.description}</td>
      <td className="text-center">{training.coachNotes}</td>
      <td className="text-center">{training.coach}</td>
    </>
  )
}

TrainingsTableRowData.propTypes = {
  trainingId: PropTypes.string.isRequired,
  training: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  training: getTraining(state, ownProps.trainingId),
})

export default connect(mapStateToProps)(React.memo(TrainingsTableRowData))
