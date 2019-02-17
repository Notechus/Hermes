import React from 'react'
import { Card, CardBody, CardHeader, TabContent, TabPane } from 'reactstrap'
import RunnerDetailsNav from 'components/Teams/Coach/RunnerDetailsNav.jsx'
import TeamMemberDetailsView from 'components/Teams/Coach/TeamMemberDetailsView.jsx'

// joined when,
// last completed training,
// next training to complete,
// total distance graph,
// avg hrs from trainings,
// training history (paged),
// personal note,
// private note on runner,
class CoachRunnerDetailsView extends React.Component {
  state = {
    activeTab: '1',
  }

  componentDidMount() {}

  componentWillUnmount() {}

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <RunnerDetailsNav activeTab={this.state.activeTab} toggle={this.toggle} />
          </CardHeader>
          <CardBody>
            <TabContent activeTab={this.state.activeTab} className="text-center">
              <TabPane tabId="1">
                <TeamMemberDetailsView username={'Notechus'} />
              </TabPane>
              <TabPane tabId="2">
                <p>
                  last completed training, next training to complete, total distance graph, avg hrs
                  from trainings,
                </p>
              </TabPane>
              <TabPane tabId="3">
                <p>training history note</p>
              </TabPane>
              <TabPane tabId="4">
                <p>personal note</p>
              </TabPane>
              <TabPane tabId="5">
                <p>private note</p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </>
    )
  }
}

export default CoachRunnerDetailsView
