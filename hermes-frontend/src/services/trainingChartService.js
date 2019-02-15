import { normalizeToPercentRange } from 'utils/functions'

export const createTotalDistanceDoughnutChart = (
  label,
  text,
  background,
  chartColor,
  completed,
  unfinished
) => ({
  data: {
    labels: [1, 2],
    datasets: [
      {
        label: label,
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: background,
        borderWidth: 0,
        data: [
          completed ? normalizeToPercentRange(completed, completed + unfinished, 0) / 100.0 : 0,
          normalizeToPercentRange(unfinished, completed + unfinished, 0) / 100.0,
        ],
      },
    ],
  },
  options: {
    ...{
      elements: {
        center: {
          text: text ? text + '%' : '0%',
          color: chartColor,
          fontStyle: 'Arial',
          sidePadding: 60,
        },
      },
      cutoutPercentage: 90,
    },
    ...chartOptions(false, false),
  },
})

export const createTotalActivitiesCountChart = (
  label,
  text,
  background,
  color,
  completed,
  unfinished
) => ({
  data: {
    labels: [1, 2],
    datasets: [
      {
        label: label,
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: background,
        borderWidth: 0,
        data: [
          completed ? normalizeToPercentRange(completed, completed + unfinished, 0) / 100.0 : 0,
          normalizeToPercentRange(unfinished, completed + unfinished, 0) / 100.0,
        ],
      },
    ],
  },
  options: {
    ...{
      elements: {
        center: {
          text: text ? text + '%' : '0%',
          color: color,
          fontStyle: 'Arial',
          sidePadding: 60,
        },
      },
      cutoutPercentage: 90,
    },
    ...chartOptions(false, false),
  },
})

export const createDistanceHistoryBarChart = (labels, data) => ({
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Distance',
        fill: true,
        backgroundColor: '#6bd098',
        hoverBorderColor: '#6bd098',
        borderWidth: 5,
        data: data,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: '#9f9f9f',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 6,
            padding: 15,
          },
          gridLines: {
            zeroLineColor: 'transparent',
            display: true,
            drawBorder: false,
            color: '#9f9f9f',
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 0.4,
          gridLines: {
            zeroLineColor: 'white',
            display: false,
            drawBorder: false,
            color: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9f9f9f',
            fontStyle: 'bold',
          },
        },
      ],
    },
  },
})

const chartOptions = (legend, tooltips) => ({
  legend: {
    display: legend,
  },
  tooltips: {
    enabled: tooltips,
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
})
