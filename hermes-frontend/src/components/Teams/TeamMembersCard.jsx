import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Button } from 'reactstrap'
import TeamMemberListCell from 'components/Teams/TeamMemberListCell.jsx'

const TeamMembersCard = ({ members }) => {
  console.log('got members', members)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="text-center">
            Team Members
          </CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="list-unstyled team-members">
            {members &&
              members.map((prop, key) => (
                <li key={key}>
                  <TeamMemberListCell member={prop} />
                </li>
              ))}
          </ul>
        </CardBody>
      </Card>
    </>
  )
}

export default TeamMembersCard
