import React from 'react'
import { connect } from 'react-redux'
import { getCurrentUserTeam } from 'reducers/entities/teamsReducer'
import Select from 'react-select'
import { FormGroup } from 'reactstrap'

const getUserDropdown = team => {
  return team && team.members
    ? team.members.map(e => ({ label: e.username, value: e.username, id: e.userId }))
    : []
}

const UsernameFromTeamDropdown = ({ team, username, memberId, onChange }) => {
  return (
    <FormGroup>
      <Select
        className="react-select primary"
        classNamePrefix="react-select"
        name="username"
        value={{
          label: username,
          value: username,
          id: memberId,
        }}
        onChange={v => onChange(v)}
        options={getUserDropdown(team)}
        placeholder="Username"
      />
    </FormGroup>
  )
}

const mapStateToProps = state => ({
  team: getCurrentUserTeam(state),
})

export default connect(mapStateToProps)(React.memo(UsernameFromTeamDropdown))
