import React from "react";
import { Col, Row } from "reactstrap";

import TrainingSummaryCollapse from "components/TrainingsNew/TrainingSummaryCollapse";
import BasicInfoTrainingSummary from "components/TrainingsNew/BasicInfoTrainingSummary";
import ActivitiesTrainingSummary from "components/TrainingsNew/ActivitiesTrainingSummary";

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
                    fullName={this.props.wizardData.fullName}
                    avatar={""}
                    trainingDate={this.props.wizardData.trainingDate}
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
                    activities={
                      this.props.wizardData.activities
                        ? this.props.wizardData.activities
                        : []
                    }
                  />
                }
                title="Activities Info"
                isOpen={this.isOpen("activitiesInfo")}
                toggle={() => this.collapsesToggle("activitiesInfo")}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default TrainingSummaryStep;
