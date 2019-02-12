import React from 'react'
import { Col, Row } from 'reactstrap'

import TrainingSummaryCollapse from 'components/TrainingsNew/TrainingSummaryCollapse'
import BasicInfoTrainingSummary from 'components/TrainingsNew/BasicInfoTrainingSummary'
import ActivitiesTrainingSummary from 'components/TrainingsNew/ActivitiesTrainingSummary'
import AdditionalInfoTrainingSummary from 'components/TrainingsNew/AdditionalInfoTrainingSummary'

class TrainingSummaryStep extends React.Component {
  state = {
    openedCollapses: ['basicInfo'],
  }

  componentDidMount() {}

  isOpen = collapse => this.state.openedCollapses.includes(collapse)

  collapsesToggle = collapse => {
    let openedCollapses = this.state.openedCollapses
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse),
      })
    } else {
      openedCollapses.push(collapse)
      this.setState({
        openedCollapses: openedCollapses,
      })
    }
  }

  render() {
    const { wizardData } = this.props
    return (
      <>
        <Row className="justify-content-center">
          <Col sm="12">
            <h5 className="info-text">Is this the correct information?</h5>
          </Col>
          <Col sm="6">
            <div
              aria-multiselectable={false}
              className="card-collapse"
              id="summary-accordion"
              role="tablist"
            >
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                title="Basic Info"
                isOpen={this.isOpen('basicInfo')}
                toggle={() => this.collapsesToggle('basicInfo')}
              >
                <BasicInfoTrainingSummary
                  username={wizardData.username}
                  description={wizardData.trainingDescription}
                  avatar={wizardData.memberAvatar}
                  trainingDate={wizardData.trainingDate}
                />
              </TrainingSummaryCollapse>
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                title="Activities Info"
                isOpen={this.isOpen('activitiesInfo')}
                toggle={() => this.collapsesToggle('activitiesInfo')}
              >
                <ActivitiesTrainingSummary
                  activities={wizardData.activities ? wizardData.activities : []}
                />
              </TrainingSummaryCollapse>
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                title="Additional Info"
                isOpen={this.isOpen('additionalInfo')}
                toggle={() => this.collapsesToggle('additionalInfo')}
              >
                <AdditionalInfoTrainingSummary
                  comment={wizardData.trainingComment}
                  importance={wizardData.importance}
                  intensity={wizardData.intensity}
                />
              </TrainingSummaryCollapse>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default TrainingSummaryStep
