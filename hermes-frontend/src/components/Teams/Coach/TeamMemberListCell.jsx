import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'
import moment from 'moment'
import TeamMemberAvatar from 'components/Teams/Coach/TeamMemberAvatar.jsx'
import { getAvatar } from 'reducers/entities/avatarsReducer'
import { fetchAvatar } from 'actions/avatarsActions'
import { useAvatar } from 'hooks/avatars'

const TeamMemberListCell = ({ member, click, avatar, fetchAvatar }) => {
  useAvatar(avatar, member.userId, fetchAvatar)

  return (
    <>
      <Row>
        <Col md="2" xs="2">
          <TeamMemberAvatar image={avatar} />
        </Col>
        <Col md="7" xs="7">
          {member.username} <br />
          <span className="text-muted">
            <small>{moment(member.joinedAt).fromNow(true)}</small>
          </span>
        </Col>
        <Col className="text-right" md="3" xs="3">
          <Button className="btn-round btn-icon" color="info" outline size="sm" onClick={click}>
            <i className="nc-icon nc-minimal-right" />
          </Button>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  avatar: getAvatar(state, ownProps.member.userId),
})

const mapDispatchToProps = dispatch => ({
  fetchAvatar: userId => dispatch(fetchAvatar(userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TeamMemberListCell))
