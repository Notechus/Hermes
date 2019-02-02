import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeam, getTeams } from 'reducers/teamsReducer'
import { fetchUserTeam } from 'actions/teamsActions'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TeamMembersCard from 'components/Teams/TeamMembersCard.jsx'
import TeamMemoCard from 'components/Teams/TeamMemoCard.jsx'

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
    const { team, teams } = this.props
    if (team) {
      return (
        <>
          <div className="content">
            <Row>
              {/*<Col md="6">*/}
              {/*<TeamMemoCard owner={team.teamOwner} memo={team.description} />*/}
              {/*</Col>*/}
              {/*<Col md="6" />*/}
              <Col md={3}>
                <TeamMembersCard members={team.members} />
              </Col>
              <Col md={9}>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4" className="text-left">
                      Details
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p>your team layout here</p>
                    <p>your team layout here</p>
                    <p>your team layout here</p>
                    <p>your team layout here</p>
                    <p>your team layout here</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )
    } else if (teams) {
      return <div className="content" />
    } else {
      return <div className="content" />
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
