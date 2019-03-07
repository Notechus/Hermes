export const API_NAME = 'HermesAPI'
export const TRAININGS_RESOURCE = '/trainings'
export const TRAININGS_ID = id => `${TRAININGS_RESOURCE}/${id}`
export const TRAININGS_FOR_USER = username => `${TRAININGS_RESOURCE}/${username}`
export const TEAMS_RESOURCE = '/teams'
export const TEAMS_ID = id => `${TEAMS_RESOURCE}/${id}`
export const GOALS_RESOURCE = '/goals'
export const ACHIEVEMENTS_RESOURCE = '/achievements'
export const USERS_RESOURCE = '/users'
export const USER_BY_ID = id => `${USERS_RESOURCE}/${id}`

const APP_VERSION_SUFFIX = 'alpha'
export const APPLICATION_VERSION = `0.1.0.${APP_VERSION_SUFFIX}`

export const BASIC_HEADERS = token => ({
  Authorization: token,
  'Content-Type': 'application/json',
})
