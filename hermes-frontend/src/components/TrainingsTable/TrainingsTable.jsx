import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import TrainingsTableRowData from 'components/TrainingsTable/TrainingsTableRowData'

const TrainingsTable = ({ data, onChange }) => {
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
        {data.map((prop, key) => (
          <tr key={key}>
            <TrainingsTableRowData row={prop} onChange={() => onChange('editTraining', prop)} />
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

TrainingsTable.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}

export default TrainingsTable
