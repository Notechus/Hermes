import { FETCH_EVENTS, NEW_EVENT, REMOVE_EVENT } from 'reducers/eventsReducer'
import { API, graphqlOperation } from 'aws-amplify'
import { listEvents } from 'graphql/queries'

const addEvent = event => ({
  type: NEW_EVENT,
  event,
})

const removeEvent = id => ({
  type: REMOVE_EVENT,
  id,
})

const fetchEvents = events => ({
  type: FETCH_EVENTS,
  events,
})

export const addNewEvent = event => async dispatch => {
  const evt = event.data && event.data.onCreateEvent ? event.data.onCreateEvent : {}
  evt.payload = JSON.parse(evt.payload)
  console.log('processing event', evt)
  dispatch(addEvent(evt))
}

export const markAsRead = id => async dispatch => {
  try {
    console.log('')
    dispatch(removeEvent(id))
  } catch (err) {
    console.log('Could not fetch events', err)
  }
}

export const fetchUserEvents = username => async dispatch => {
  try {
    const userEvents = await API.graphql(
      graphqlOperation(listEvents, { filter: { username: { eq: username }, seen: { eq: false } } })
    )
    console.log('fetched events', userEvents)

    const events =
      userEvents.data && userEvents.data && userEvents.data.listEvents
        ? userEvents.data.listEvents.items
        : []
    dispatch(
      fetchEvents(
        events.map(e => {
          e.payload = JSON.parse(e.payload)
          return e
        })
      )
    )
  } catch (err) {
    console.log('Could not fetch user events', err)
  }
}
