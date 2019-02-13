import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import { getCurrentMonthNumber } from 'utils/functions'

const chart = (month, data) => ({
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].slice(0, month),
    datasets: [
      {
        label: 'Distance',
        borderColor: '#6bd098',
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        borderWidth: 3,
        data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610],
      },
    ],
  },
  options: {
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
            fontColor: '#9f9f9f',
            beginAtZero: false,
            maxTicksLimit: 5,
            //padding: 20
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
            display: false,
          },
          ticks: {
            padding: 20,
            fontColor: '#9f9f9f',
          },
        },
      ],
    },
  },
})

const DashboardDistanceLineChart = () => {
  const chartData = chart(getCurrentMonthNumber())
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col sm="7">
              <div className="numbers pull-left">$34,657</div>
            </Col>
            <Col sm="5">
              <div className="pull-right">
                <Badge color="success" pill>
                  +18%
                </Badge>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <h6 className="big-title">Training distances this year</h6>
          <Line data={chartData.data} options={chartData.options} height={380} width={826} />
        </CardBody>
        <CardFooter>
          <hr />
          <Row>
            <Col sm="7">
              <div className="footer-title">Financial Statistics</div>
            </Col>
            <Col sm="5">
              <div className="pull-right">
                <Button className="btn-round btn-icon" color="success" size="sm">
                  <i className="nc-icon nc-simple-add" />
                </Button>
              </div>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </>
  )
}

export default React.memo(DashboardDistanceLineChart)
