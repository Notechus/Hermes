import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import AdminLayout from 'layouts/App/App.jsx'
import { createBrowserHistory } from 'history'
import {
  ConfirmSignIn,
  ForgotPassword,
  RequireNewPassword,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react'

import Login from 'views/auth/Login'
import Loading from 'views/auth/LoadingPage'
import Register from 'views/auth/Register'
import ConfirmRegister from 'views/auth/ConfirmRegister'
import configureStore from 'store/configureStore'

const hist = createBrowserHistory()
const store = configureStore()

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            <Route
              path="/app"
              render={props => (
                <AdminLayout
                  {...props}
                  authState={this.props.authState}
                  authData={this.props.authData}
                  onStateChange={this.props.onStateChange}
                />
              )}
            />
            <Redirect from="/" to="/app/dashboard" />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default withAuthenticator(App, false, [
  <Login />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <Register />,
  <Loading />,
  <ConfirmRegister />,
  <ForgotPassword />,
  <RequireNewPassword />,
])
