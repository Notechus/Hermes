import React from 'react'
import DashboardStatisticsCard from 'components/Dashboard/DashboardStatisticsCard'
import DashboardUpdateTimeFooter from 'components/Dashboard/DashboardUpdateTimeFooter'
import { Doughnut } from 'react-chartjs-2'
import { normalizeToPercentRange } from 'utils/functions'

const chart = (completed, unfinished) => ({
  data: {
    labels: [1, 2],
    datasets: [
      {
        label: 'Activities',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#f4f3ef'],
        borderWidth: 0,
        data: [
          completed ? normalizeToPercentRange(completed, completed + unfinished, 0) / 100.0 : 0,
          normalizeToPercentRange(unfinished, completed + unfinished, 0) / 100.0,
        ],
      },
    ],
  },
  options: {
    elements: {
      center: {
        text: completed
          ? normalizeToPercentRange(completed, completed + unfinished, 0).toFixed(1) + '%'
          : '0%',
        color: '#66615c', // Default is #000000
        fontStyle: 'Arial', // Default is Arial
        sidePadding: 60, // Defualt is 20 (as a percentage)
      },
    },
    cutoutPercentage: 90,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: 'transparent',
            color: 'rgba(255,255,255,0.05)',
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(255,255,255,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  },
})

const TotalProgressStatisticCard = ({ trainings, updateTime }) => {
  const totalCompletedActivities = trainings ? trainings.filter(e => e.completed).length : 0
  const totalUnfinishedActivities = trainings ? trainings.filter(e => !e.completed).length : 0
  const chartData = chart(totalCompletedActivities, totalUnfinishedActivities)
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
