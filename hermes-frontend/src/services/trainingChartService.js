import { normalizeToPercentRange } from '../utils/functions'

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
    elements: {
      center: {
        text: text ? text + '%' : '0%',
        color: chartColor,
        fontStyle: 'Arial',
        sidePadding: 60,
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
    elements: {
      center: {
        text: text ? text + '%' : '0%',
        color: color, // Default is #000000
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
