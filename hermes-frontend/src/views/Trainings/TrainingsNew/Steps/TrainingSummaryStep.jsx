import React from "react";
import { Col, Row } from "reactstrap";

import TrainingSummaryCollapse from "components/TrainingsNew/TrainingSummaryCollapse";
import BasicInfoTrainingSummary from "components/TrainingsNew/BasicInfoTrainingSummary";
import ActivitiesTrainingSummary from "components/TrainingsNew/ActivitiesTrainingSummary";
import AdditionalInfoTrainingSummary from "components/TrainingsNew/AdditionalInfoTrainingSummary";

class TrainingSummaryStep extends React.Component {
  state = {
    openedCollapses: ["basicInfo"]
  };

  componentDidMount() {}

  isOpen = collapse => this.state.openedCollapses.includes(collapse);

  collapsesToggle = collapse => {
    let openedCollapses = this.state.openedCollapses;
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };

  render() {
    const { wizardData } = this.props;
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
                content={
                  <BasicInfoTrainingSummary
                    username={wizardData.username}
                    avatar={wizardData.memberAvatar}
                    loaded={wizardData.loaded}
                    trainingDate={wizardData.trainingDate}
                  />
                }
                title="Basic Info"
                isOpen={this.isOpen("basicInfo")}
                toggle={() => this.collapsesToggle("basicInfo")}
              />
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                content={
                  <ActivitiesTrainingSummary
                    activities={wizardData.activities ? wizardData.activities : []}
                  />
                }
                title="Activities Info"
                isOpen={this.isOpen("activitiesInfo")}
                toggle={() => this.collapsesToggle("activitiesInfo")}
              />
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                content={
                  <AdditionalInfoTrainingSummary
                    comment={wizardData.trainingComment}
                    importance={wizardData.importance}
                    intensity={wizardData.intensity}
                  />
                }
                title="Additional Info"
                isOpen={this.isOpen("additionalInfo")}
                toggle={() => this.collapsesToggle("additionalInfo")}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default TrainingSummaryStep;
