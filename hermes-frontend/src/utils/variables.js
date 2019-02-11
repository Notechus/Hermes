export const API_NAME = 'HermesAPI'
export const TRAININGS_RESOURCE = '/trainings'
export const TRAININGS_FOR_USER = username => `${TRAININGS_RESOURCE}/${username}`
export const TEAMS_RESOURCE = '/teams'
export const USER_TEAM = username => `${TEAMS_RESOURCE}/${username}`
export const GOALS_RESOURCE = '/goals'
export const ACHIEVEMENTS_RESOURCE = '/achievements'

const APP_VERSION_SUFFIX = 'alpha'
export const APPLICATION_VERSION = `0.0.5.${APP_VERSION_SUFFIX}`

export const BASIC_HEADERS = token => ({
  Authorization: token,
  'Content-Type': 'application/json',
})
