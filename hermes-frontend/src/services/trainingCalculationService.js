import { round } from 'utils/functions'

export const aggregateDistanceFromTrainingsWithStatus = (trainings, status) => {
  return aggregateDistanceFromTrainings(trainings.filter(t => t.completed === status))
}

export const aggregateDistanceFromTrainings = trainings => {
  return trainings
    ? trainings
        .map(t => aggregateTrainingActivitiesDistance(t.activities))
        .reduce((a, b) => a + b, 0.0)
    : 0.0
}

export const aggregateTrainingActivitiesDistanceWithRounding = activities => {
  const distance = aggregateTrainingActivitiesDistance(activities)
  return round(distance)
}

export const countTrainingsWithStatus = (trainings, status) =>
  trainings ? trainings.filter(e => e.completed === status).length : 0

export const aggregateTrainingActivitiesDistance = activities => {
  return activities
    ? activities.map(e => (e.distance ? e.distance : 0.0)).reduce((a, b) => a + b, 0.0)
    : 0.0
}
