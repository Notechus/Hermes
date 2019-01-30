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
        label: 'Trainings',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#fcc468', '#f4f3ef'],
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

const getTotalDistanceFromTrainingsWithStatus = (trainings, status) => {
  return trainings
    .filter(t => t.completed === status)
    .map(t => t.activities)
    .map(a => aggregateActivitiesDistanceAndStatus(a))
    .reduce((a, b) => a + b, 0.0)
}

const aggregateActivitiesDistanceAndStatus = activities => {
  return activities
    ? activities.map(e => (e.distance ? e.distance : 0.0)).reduce((a, b) => a + b, 0.0)
    : 0.0
}

const TotalDistanceStatisticCard = ({ trainings, updateTime }) => {
  const totalCompletedDistance = getTotalDistanceFromTrainingsWithStatus(trainings, true)
  const totalUnfinishedDistance = getTotalDistanceFromTrainingsWithStatus(trainings, false)
  const chartData = chart(totalCompletedDistance, totalUnfinishedDistance)
  return (
    <>
      <DashboardStatisticsCard
        title="Distance run"
        subTitle={
          <>
            Out Of Total{' '}
            <b>
              {totalCompletedDistance}/ {totalCompletedDistance + totalUnfinishedDistance} km
            </b>
          </>
        }
        body={
          <Doughnut
            data={chartData.data}
            options={chartData.options}
            className="ct-chart ct-perfect-fourth"
            height={300}
            width={456}
          />
        }
        footerLegend="Completed"
        footerStats={<DashboardUpdateTimeFooter time={updateTime} />}
      />
    </>
  )
}

export default TotalDistanceStatisticCard
