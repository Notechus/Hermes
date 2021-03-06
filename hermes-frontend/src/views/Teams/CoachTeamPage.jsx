import React from 'react'
import { Col, Row } from 'reactstrap'
import TeamMembersCard from 'components/Teams/Coach/TeamMembersCard.jsx'
import CoachRunnerDetailsView from 'views/Teams/CoachRunnerDetailsView.jsx'

const CoachTeamPage = ({ team, click }) => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md={3}>
            <TeamMembersCard members={team.members} click={e => console.log(e)} />
          </Col>
          <Col md={9}>
            <CoachRunnerDetailsView />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default React.memo(CoachTeamPage)
