import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Badge } from 'reactstrap'
import { useEventSubscription } from 'hooks/events'
import { getLatestEvents } from 'reducers/eventsReducer'
import { addNewEvent, fetchUserEvents } from 'actions/eventsActions'
import NavbarDropdownItem from 'components/Navbars/NavbarDropdownItem.jsx'
import { getUser } from 'reducers/authorizationDataReducer'

const onClickEvent = e => e.preventDefault() || console.log('clicked')

const EventNavbarDropdown = ({ events, user, onEvent, getEvents }) => {
  useEventSubscription(user.username, onEvent)

  useEffect(
    () => {
      if (user && user.username) {
        getEvents(user.username)
      }
    },
    [user.username]
  )

  return (
    <>
      <UncontrolledDropdown nav>
        <DropdownToggle
          aria-haspopup={true}
          caret
          color="default"
          data-toggle="dropdown"
          id="navbarDropdownEventLink"
          nav
        >
          {events && events.length > 0 && (
            <Badge pill color="danger" className="notify-badge">
              {events.length}
            </Badge>
          )}
          <i className="nc-icon nc-bell-55" />
          <p>
            <span className="d-lg-none d-md-block">Notifications</span>
          </p>
        </DropdownToggle>
        <DropdownMenu aria-labelledby="navbarDropdownEventLink" right>
          {events && events.length ? (
            events.map((prop, key) => (
              <DropdownItem key={key} href="#pablo" onClick={onClickEvent}>
                <NavbarDropdownItem
                  message={
                    prop.payload && prop.payload.message ? prop.payload.message : 'New notification'
                  }
                  time={prop.creationTime}
                />
              </DropdownItem>
            ))
          ) : (
            <DropdownItem href="#pablo">No new notifications</DropdownItem>
          )}
          <DropdownItem divider />
          <DropdownItem>View more</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

const mapStateToProps = state => ({
  user: getUser(state),
  events: getLatestEvents(state),
})

const mapDispatchToProps = dispatch => ({
  onEvent: event => dispatch(addNewEvent(event)),
  getEvents: username => dispatch(fetchUserEvents(username)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EventNavbarDropdown))
