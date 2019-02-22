// eslint-disable
// this is an auto generated file. This will be overwritten

export const subscribeToEvents = username => `subscription myEvents {
  onCreateEvent(username:"${username}"){
    id
    eventType
    username
    payload
    creationTime
    seen
  }
}`

export const onCreateEvent = `subscription OnCreateEvent(
  $id: ID
  $eventType: String
  $username: String
  $payload: AWSJSON
  $creationTime: String
) {
  onCreateEvent(
    id: $id
    eventType: $eventType
    username: $username
    payload: $payload
    creationTime: $creationTime
  ) {
    id
    eventType
    username
    payload
    creationTime
    modificationTime
    seen
    silencable
  }
}
`
export const onUpdateEvent = `subscription OnUpdateEvent(
  $id: ID
  $eventType: String
  $username: String
  $payload: AWSJSON
  $creationTime: String
) {
  onUpdateEvent(
    id: $id
    eventType: $eventType
    username: $username
    payload: $payload
    creationTime: $creationTime
  ) {
    id
    eventType
    username
    payload
    creationTime
    modificationTime
    seen
    silencable
  }
}
`
export const onDeleteEvent = `subscription OnDeleteEvent(
  $id: ID
  $eventType: String
  $username: String
  $payload: AWSJSON
  $creationTime: String
) {
  onDeleteEvent(
    id: $id
    eventType: $eventType
    username: $username
    payload: $payload
    creationTime: $creationTime
  ) {
    id
    eventType
    username
    payload
    creationTime
    modificationTime
    seen
    silencable
  }
}
`
