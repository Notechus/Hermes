import React from 'react'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard'
import DashboardUpdateTimeFooter from 'components/Dashboard/DashboardUpdateTimeFooter'
import { Doughnut } from 'react-chartjs-2'
import { normalizeToPercentRange } from 'utils/functions'
import { countTrainingsWithStatus } from 'services/trainingCalculationService'
import { createTotalActivitiesCountChart } from 'services/trainingChartService'

const TotalProgressStatisticCard = ({ trainings, updateTime }) => {
  const totalCompletedActivities = countTrainingsWithStatus(trainings, true)
  const totalUnfinishedActivities = countTrainingsWithStatus(trainings, false)
  const chartLabel = normalizeToPercentRange(
    totalCompletedActivities,
    totalCompletedActivities + totalUnfinishedActivities,
    0
  ).toFixed(1)
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
        subTitle="Total progress"
        footerLegend="Completed"
        footerClass="text-danger"
        footerStats={<DashboardUpdateTimeFooter time={updateTime} />}
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

export default React.memo(TotalProgressStatisticCard)
