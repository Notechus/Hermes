import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeams } from 'reducers/entities/teamsReducer'
import { fetchUserTeam } from 'actions/teamsActions'
import CoachTeamPage from 'views/Teams/CoachTeamPage.jsx'
import RunnerTeamPage from 'views/Teams/RunnerTeamPage.jsx'
import ContentLoading from 'components/Loading/ContentLoading.jsx'

class TeamsPage extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { user, fetchTeam } = this.props
    if (user && user.username) {
      fetchTeam(user.username, user.type).then(() => this.setState({ loading: false }))
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { user, fetchTeam } = this.props
    if (user && user.username && user.username !== prevProps.user.username) {
      fetchTeam(user.username, user.type).then(() => this.setState({ loading: false }))
    }
  }

  render() {
    const { teams, user } = this.props
    const { loading } = this.state
    if (loading) {
      return <ContentLoading text="Fetching teams" />
    }
    const team = teams ? teams.filter(e => e.teamId === user.teamId).find(e => e) : null
    if (user.type === 'Coach') {
      return team ? <CoachTeamPage team={team} /> : <div className="content">Create a team</div>
    } else if (user.type === 'Member') {
      return team ? <RunnerTeamPage team={team} /> : <div className="content">Join a team</div>
    } else {
      return <div className="content" />
    }
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  teams: getTeams(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTeam: (username, type) => dispatch(fetchUserTeam(username, type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsPage)
