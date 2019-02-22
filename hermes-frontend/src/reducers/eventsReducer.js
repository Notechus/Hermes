import { createActionNamespace } from 'utils/actions'
import { sortByDateTimeStringDesc } from 'utils/functions'

const trainingsAction = createActionNamespace('events')

export const NEW_EVENT = trainingsAction('NEW_EVENT')
export const REMOVE_EVENT = trainingsAction('REMOVE_EVENT')
export const FETCH_EVENTS = trainingsAction('FETCH_EVENTS')

export const getEvents = state => state.events.events

const initialState = {
  events: [],
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_EVENT:
      return { ...state, events: [...state.events, action.event] }
    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events
          .filter(e => e.id !== action.id)
          .sort((a, b) => sortByDateTimeStringDesc(a.creationTime, b.creationTime)),
      }
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.events.sort((a, b) =>
          sortByDateTimeStringDesc(a.creationTime, b.creationTime)
        ),
      }
    default:
      return state
  }
}

export default eventsReducer
