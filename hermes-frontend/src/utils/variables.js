export const API_NAME = "HermesAPI";
export const TRAININGS_RESOURCE = "/trainings";
export const TRAININGS_FOR_USER = username =>
  `${TRAININGS_RESOURCE}/${username}`;
export const GOALS_RESOURCE = "/goals";
export const ACHIEVEMENTS_RESOURCE = "/achievements";

export const BASIC_HEADERS = token => ({
  Authorization: token,
  "Content-Type": "application/json"
});
