import React from 'react'
import { connect } from 'react-redux'
import { getCurrentMonthTrainings } from 'reducers/entities/trainingsReducer'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard'
import { Doughnut } from 'react-chartjs-2'
import { normalizeToPercentRange, round } from 'utils/functions'
import { createTotalDistanceDoughnutChart } from 'services/trainingChartService'
import { aggregateDistanceFromTrainingsWithStatus } from 'services/trainingCalculationService'
import { getWebStatistic } from 'reducers/webStatisticsReducer'

const TotalDistanceStatisticCard = ({ trainings, updateTime }) => {
  const totalCompletedDistance = aggregateDistanceFromTrainingsWithStatus(trainings, true)
  const totalUnfinishedDistance = aggregateDistanceFromTrainingsWithStatus(trainings, false)
  const chartLabel = totalCompletedDistance
    ? normalizeToPercentRange(
        totalCompletedDistance,
        totalUnfinishedDistance + totalCompletedDistance,
        0
      ).toFixed(1)
    : 0.0
  const chartData = createTotalDistanceDoughnutChart(
    'Trainings',
    chartLabel,
    ['#4acccd', '#f4f3ef'],
    '#66615c',
    totalCompletedDistance,
    totalUnfinishedDistance
  )
  return (
    <>
      <DashboardStatisticsCard
        title="Distance run"
        subTitle={
          <>
            This month{' '}
            <b>
              {round(totalCompletedDistance)} /{' '}
              {round(totalCompletedDistance + totalUnfinishedDistance)} km
            </b>
          </>
        }
        footerLegend="Completed"
        footerClass="text-info"
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

const mapStateToProps = state => ({
  trainings: getCurrentMonthTrainings(state),
  updateTime: getWebStatistic(state, 'LOAD_USER_TRAININGS')
})

export default connect(mapStateToProps)(React.memo(TotalDistanceStatisticCard))
