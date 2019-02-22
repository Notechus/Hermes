// eslint-disable
// this is an auto generated file. This will be overwritten

export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
`;
export const listEvents = `query ListEvents(
  $filter: TableEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      eventType
      username
      payload
      creationTime
      modificationTime
      seen
      silencable
    }
    nextToken
  }
}
`;
