import React from 'react'
import { Card, CardBody, CardFooter } from 'reactstrap'

const TeamMemoCard = ({ memo, owner }) => {
  return (
    <>
      <Card className="card-testimonial">
        <CardBody>
          <div className="icon icon-primary">
            <i className="fa fa-quote-right" />
          </div>
          <p className="card-description">{memo}</p>
        </CardBody>
        <CardFooter>
          {/*<CardTitle tag="h4">Gina Andrew</CardTitle>*/}
          <h6 className="card-category">@{owner}</h6>
        </CardFooter>
      </Card>
    </>
  )
}

export default React.memo(TeamMemoCard)
