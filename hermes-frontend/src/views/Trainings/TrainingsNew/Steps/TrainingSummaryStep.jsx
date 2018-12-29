import React from "react";
import { Col, Row } from "reactstrap";

import TrainingSummaryCollapse from "components/TrainingsNew/TrainingSummaryCollapse";
import UserInfoTrainingSummary from "components/TrainingsNew/UserInfoTrainingSummary";

class TrainingSummaryStep extends React.Component {
  state = {
    openedCollapses: ["userInfo"]
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
                content={<UserInfoTrainingSummary />}
                title="User Info"
                isOpen={this.isOpen("userInfo")}
                toggle={() => this.collapsesToggle("userInfo")}
              />
              <TrainingSummaryCollapse
                parent="#summary-accordion"
                content={
                  <>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </>
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
