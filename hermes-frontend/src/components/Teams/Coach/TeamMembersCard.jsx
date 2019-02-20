import React from 'react'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import TeamMemberListCell from 'components/Teams/Coach/TeamMemberListCell.jsx'

const TeamMembersCard = ({ members, click }) => {
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
                  <TeamMemberListCell member={prop} click={() => click(prop)} />
                </li>
              ))}
          </ul>
        </CardBody>
      </Card>
    </>
  )
}

export default React.memo(TeamMembersCard)
