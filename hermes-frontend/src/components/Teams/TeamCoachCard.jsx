import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap'
import ImageAvatarNoUpload from 'components/CustomUpload/ImageAvatarNoUpload.jsx'

const TeamCoachCard = ({ description, owner, ownerId }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="text-center">
            Coach
          </CardTitle>
        </CardHeader>
        <CardBody className="text-center">
          <div className="icon icon-primary">
            <i className="fa fa-quote-right" />
          </div>
          <p className="card-description">{description}</p>
        </CardBody>
        <CardFooter className="text-center">
          <ImageAvatarNoUpload />
          <h6 className="card-category">@{owner}</h6>
        </CardFooter>
      </Card>
    </>
  )
}

export default React.memo(TeamCoachCard)
