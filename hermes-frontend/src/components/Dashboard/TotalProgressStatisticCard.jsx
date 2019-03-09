import React from 'react'
import { connect } from 'react-redux'
import { getCurrentMonthTrainingsSelect } from 'reducers/entities/trainingsReducer'
import { getWebStatistic } from 'reducers/webStatisticsReducer'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard'
import { Doughnut } from 'react-chartjs-2'
import { normalizeToPercentRange, round } from 'utils/functions'
import { countTrainingsWithStatus } from 'services/trainingCalculationService'
import { createTotalActivitiesCountChart } from 'services/trainingChartService'

const TotalProgressStatisticCard = ({ trainings, updateTime }) => {
  const totalCompletedActivities = countTrainingsWithStatus(trainings, true)
  const totalUnfinishedActivities = countTrainingsWithStatus(trainings, false)
  const chartLabel = totalCompletedActivities
    ? normalizeToPercentRange(
        totalCompletedActivities,
        totalCompletedActivities + totalUnfinishedActivities,
        0
      ).toFixed(1)
    : 0.0
  const chartData = createTotalActivitiesCountChart(
    'Activities',
    chartLabel,
    ['#f17e5d', '#f4f3ef'],
    '#66615c',
    totalCompletedActivities,
    totalUnfinishedActivities
  )
  return (
    <>
      <DashboardStatisticsCard
        title="This month"
        subTitle={
          <>
            Total progress{' '}
            <b>
              {round(totalCompletedActivities)} /{' '}
              {round(totalCompletedActivities + totalUnfinishedActivities)}
            </b>
          </>
        }
        footerLegend="Completed"
        footerClass="text-danger"
        footerStats={updateTime}
      >
        <Doughnut
          data={chartData.data}
          options={chartData.options}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
        />
      </DashboardStatisticsCard>
    </>
  )
}

const mapStateToProps = state => {
  const getCurrentMonthTrainings = getCurrentMonthTrainingsSelect()
  return {
    trainings: getCurrentMonthTrainings(state),
    updateTime: getWebStatistic(state, 'LOAD_USER_TRAININGS'),
  }
}

export default connect(mapStateToProps)(React.memo(TotalProgressStatisticCard))
