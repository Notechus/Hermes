import React from 'react'
import { Badge } from 'reactstrap'
import { aggregateTrainingActivitiesDistanceWithRounding } from 'services/trainingCalculationService'

const TrainingCardBody = ({ intensity, description, activities }) => {
  return (
    <>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <Badge color="info" pill>
            Intensity: {intensity}
          </Badge>
          <Badge color="success" pill>
            Distance: {aggregateTrainingActivitiesDistanceWithRounding(activities)} km
          </Badge>
        </div>
        <div className="timeline-body mt-5">
          <h5 className="text-center">
            <strong>Activities: {activities ? activities.length : 0}</strong>
          </h5>
          <h6 className="text-center">{description}</h6>
        </div>
      </div>
    </>
  )
}

export default React.memo(TrainingCardBody)
