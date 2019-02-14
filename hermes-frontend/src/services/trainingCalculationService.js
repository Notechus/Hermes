import { round } from 'utils/functions'

export const aggregateDistanceFromTrainingsWithStatus = (trainings, status) => {
  return trainings
    .filter(t => t.completed === status)
    .map(t => t.activities)
    .map(a => aggregateTrainingActivitiesDistance(a))
    .reduce((a, b) => a + b, 0.0)
}

export const aggregateTrainingActivitiesDistanceWithRounding = activities => {
  const distance = aggregateTrainingActivitiesDistance(activities)
  return round(distance)
}

export const countTrainingsWithStatus = (trainings, status) =>
  trainings ? trainings.filter(e => e.completed === status).length : 0

const aggregateTrainingActivitiesDistance = activities => {
  return activities
    ? activities.map(e => (e.distance ? e.distance : 0.0)).reduce((a, b) => a + b, 0.0)
    : 0.0
}
