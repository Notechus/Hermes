import React from 'react'
import { connect } from 'react-redux'
import TrainingCardBody from 'components/Dashboard/TrainingCardBody.jsx'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard.jsx'
import { getNextTraining } from 'reducers/entities/trainingsReducer'
import moment from 'moment'
import { DATE_FORMAT } from 'utils/functions'
import { getWebStatistic } from 'reducers/webStatisticsReducer'

const NextTrainingCard = ({ training, trainingsUpdated }) => {
  return (
    <DashboardStatisticsCard
      title="Next training"
      subTitle={training ? moment(training.trainingDate).format(DATE_FORMAT) : ''}
      footerStats={trainingsUpdated}
    >
      <TrainingCardBody
        intensity={training ? training.intensity : 0}
        description={training ? training.description : ''}
        activities={training ? training.activities : []}
      />
    </DashboardStatisticsCard>
  )
}

const mapStateToProps = state => ({
  training: getNextTraining(state),
  trainingsUpdated: getWebStatistic(state, 'LOAD_USER_TRAININGS')
})

export default connect(mapStateToProps)(React.memo(NextTrainingCard))
