import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import TrainingsTableRowData from 'components/TrainingsTable/TrainingsTableRowData'

const TrainingsTable = ({ ids }) => {
  return (
    <Table responsive>
      <thead className="text-primary">
        <tr>
          <th className="text-left">Training Date</th>
          <th className="text-left"> Weekday</th>
          <th className="text-center"> Completed</th>
          <th className="text-center">Description</th>
          <th className="text-center">Coach Notes</th>
          <th className="text-center">Coach</th>
        </tr>
      </thead>
      <tbody>
        {ids.map(id => (
          <tr key={id}>
            <TrainingsTableRowData trainingId={id} />
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TrainingsTable.propTypes = {
  ids: PropTypes.array.isRequired,
}

export default React.memo(TrainingsTable)
