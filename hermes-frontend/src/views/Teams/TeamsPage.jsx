import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeam, getTeams } from 'reducers/teamsReducer'
import { fetchUserTeam } from 'actions/teamsActions'
import CoachTeamPage from 'views/Teams/CoachTeamPage.jsx'

class TeamsPage extends Component {
  state = {}

  componentDidMount() {
    if (this.props.user && this.props.user.username) {
      this.props.fetchTeam(this.props.user.username)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.user &&
      this.props.user.username &&
      this.props.user.username !== prevProps.user.username
    ) {
      this.props.fetchTeam(this.props.user.username)
    }
  }

  render() {
    const { team, teams, user } = this.props
    if (user.type === 'Coach') {
      return team ? <CoachTeamPage team={team} /> : <div className="content">Create a team</div>
    } else {
      return team ? (
        <div className="content">Your team</div>
      ) : (
        <div className="content">Join a team</div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  team: getTeam(state),
  teams: getTeams(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTeam: username => dispatch(fetchUserTeam(username)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsPage)
