import React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, Button, Container, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TeamDetailsJoinView from 'components/Teams/TeamDetailsJoinView.jsx'
import TeamAutocompletePicker from 'components/Teams/TeamAutocompletePicker.jsx'
import TeamJoinModal from 'components/Teams/TeamJoinModal.jsx'
import { getUser } from 'reducers/authorizationDataReducer'
import { getTeams } from 'reducers/teamsReducer'
import { fetchTeams, joinTeam } from 'actions/teamsActions'

class JoinTeamPage extends React.Component {
  state = {
    selected: false,
    joinModal: false,
    value: '',
    team: null,
  }

  componentDidMount() {
    this.props.fetchTeams()
  }

  clearSelection = () => {
    this.setState({ selected: false, value: '' })
  }

  checkTeam = () => {
    const { value } = this.state
    const { teams } = this.props
    const team = teams
      ? teams.filter(e => e.teamName.toLowerCase() === value.toLowerCase()).find(e => e)
      : null

    console.log('got team', team)
    this.setState({ selected: true, team })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  joinTeam = () => {
    console.log('trying to join team', this.state.team)
    this.setState({ joinModal: true })
  }

  closeModal = () => {
    this.setState({ joinModal: false })
  }

  tryJoinTeam = () => {
    const { user } = this.props
    const { team, joinCode } = this.state
    if (user && team) {
      console.log('joining team', team, user)
      this.props
        .joinTeam(user.username, user.cognitoId, joinCode)
        .then(() => console.log('successfully joined, add sweet alert here'))
    }
  }

  render() {
    const { selected, team, value, joinModal } = this.state
    const { teams } = this.props
    return (
      <>
        <div className="content">
          <TeamJoinModal isOpen={joinModal} toggle={this.closeModal} submit={this.tryJoinTeam} />
          <Container>
            <Row>
              <Col md={12}>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4" className="text-left">
                      Join a team
                    </CardTitle>
                    <CardBody>
                      <Row>
                        <Col md={3} className="mt-2">
                          <TeamAutocompletePicker
                            teams={teams}
                            value={value}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col md={1}>
                          <Button className="btn" color="success" onClick={this.checkTeam}>
                            Check
                          </Button>
                        </Col>
                        <Col md={2}>
                          <Button className="btn" color="default" onClick={this.clearSelection}>
                            Clear
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {selected && team && <TeamDetailsJoinView team={team} join={this.joinTeam} />}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  teams: getTeams(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: () => dispatch(fetchTeams),
  joinTeam: (username, userId, joinCode) => dispatch(joinTeam(username, userId, joinCode)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinTeamPage)
