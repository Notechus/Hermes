import { useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { subscribeToEvents } from 'graphql/subscriptions'

export const useEventSubscription = (username, onEvent) => {
  useEffect(
    () => {
      if (!username) {
        return
      }
      const sub = API.graphql(graphqlOperation(subscribeToEvents(username))).subscribe({
        next: event => console.log('received evt', event) || onEvent(event.value),
        error: err => console.log('error graphql', err),
      })

      return () => {
        sub.unsubscribe()
      }
    },
    [username]
  )
}
