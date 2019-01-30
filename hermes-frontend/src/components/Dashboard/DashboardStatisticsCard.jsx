import React from "react";
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "reactstrap";

const DashboardStatisticsCard = ({ title, subTitle, body, footerLegend, footerStats }) => {
  return (
    <>
      <Card style={{ minHeight: "420px" }}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="card-category">{subTitle}</p>
        </CardHeader>
        <CardBody>{body}</CardBody>
        <CardFooter>
          {footerLegend && (
            <div className="legend">
              <i className="fa fa-circle text-info" />
              {footerLegend}
            </div>
          )}
          <hr />
          <div className="stats">{footerStats}</div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardStatisticsCard;