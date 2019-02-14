import React from 'react'

import { Card, CardBody, CardHeader, Collapse } from 'reactstrap'

const TrainingSummaryCollapse = ({ parent, children, title, isOpen, toggle }) => {
  return (
    <>
      <Card className="card-plain">
        <CardHeader role="tab">
          <a
            aria-expanded={isOpen}
            href="#c"
            data-parent={parent}
            data-toggle="collapse"
            onClick={toggle}
          >
            {title} <i className="nc-icon nc-minimal-down" />
          </a>
        </CardHeader>
        <Collapse role="tabpanel" isOpen={isOpen}>
          <CardBody>{children}</CardBody>
        </Collapse>
      </Card>
    </>
  )
}

export default React.memo(TrainingSummaryCollapse)
