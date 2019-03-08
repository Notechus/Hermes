import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap'
import DashboardUpdateTimeFooter from 'components/Dashboard/DashboardUpdateTimeFooter'

const DashboardStatisticsCard = ({
  title,
  subTitle,
  children,
  footerLegend,
  footerClass,
  footerStats,
}) => {
  return (
    <>
      <Card style={{ minHeight: '420px' }}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="card-category">{subTitle}</p>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
          {footerLegend && (
            <div className="legend">
              <i className={'fa fa-circle ' + footerClass} />
              {footerLegend}
            </div>
          )}
          <hr />
          <div className="stats">
            <DashboardUpdateTimeFooter time={footerStats} />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default React.memo(DashboardStatisticsCard)
