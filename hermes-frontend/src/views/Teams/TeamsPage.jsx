import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeam } from 'reducers/teamsReducer'
import { fetchUserTeam } from 'actions/teamsActions'
import CoachTeamPage from 'views/Teams/CoachTeamPage.jsx'
import RunnerTeamPage from 'views/Teams/RunnerTeamPage.jsx'
import JoinTeamPage from 'views/Teams/JoinTeamPage.jsx'
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
    const { team, user } = this.props
    const { loading } = this.state
    if (loading) {
      return <ContentLoading text="Fetching teams" />
    }
    if (user.type === 'Coach') {
      return team ? <CoachTeamPage team={team} /> : <div className="content">Create a team</div>
    } else if (user.type === 'Member') {
      return team ? <RunnerTeamPage team={team} /> : <JoinTeamPage />
    } else {
      return <div className="content" />
    }
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  team: getTeam(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTeam: (username, type) => dispatch(fetchUserTeam(username, type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsPage)
