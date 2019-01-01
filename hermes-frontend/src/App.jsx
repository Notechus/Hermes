import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.jsx";
import { createBrowserHistory } from "history";
import { withAuthenticator } from "aws-amplify-react";

import configureStore from "store/configureStore";

const hist = createBrowserHistory();
const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            <Route
              path="/admin"
              render={props => (
                <AdminLayout
                  {...props}
                  authState={this.props.authState}
                  authData={this.props.authData}
                  onStateChange={this.props.onStateChange}
                />
              )}
            />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default withAuthenticator(App, false);
