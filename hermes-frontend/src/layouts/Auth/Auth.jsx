import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";

import routes from "routes.js";

let ps;

class Pages extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.fullPages);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  getRoutes = routes => {
    return routes
      .filter(route => route.layout === "/auth")
      .map((prop, key) => {
        if (prop.collapse) {
          return this.getRoutes(prop.views);
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      });
  };
  render() {
    return (
      <>
        <AuthNavbar current={this.props.history.location.pathname} />
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
