import React from 'react'
import { Card, CardBody, Button, Container, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import TeamCoachCard from 'components/Teams/TeamCoachCard.jsx'
import TeamAutocompletePicker from 'components/Teams/TeamAutocompletePicker.jsx'

class JoinTeamPage extends React.Component {
  state = {
    selected: false,
    value: '',
    team: null,
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

  render() {
    return (
      <>
        <div className="content">
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
                            teams={this.props.teams}
                            value={this.state.value}
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
                {this.state.selected && (
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md={4}>
                          <TeamCoachCard description={'description'} owner={'bacalacio'} />
                        </Col>
                        <Col md={8}>
                          <h4 className="text-left">Details</h4>
                          <div>Details about the team go here</div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

export default JoinTeamPage
