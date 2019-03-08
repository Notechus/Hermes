import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import AdminLayout from 'layouts/App/App.jsx'
import { createBrowserHistory } from 'history'
import {
  ConfirmSignIn,
  RequireNewPassword,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react'

import Login from 'views/auth/Login'
import Loading from 'views/auth/LoadingPage'
import Register from 'views/auth/Register'
import ConfirmRegister from 'views/auth/ConfirmRegister'
import ForgotPassword from 'views/auth/ForgotPassword'
import configureStore from 'store/configureStore'

const hist = createBrowserHistory()
const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  // whyDidYouUpdate(React, { exclude: [/^Connect/] })
  whyDidYouUpdate(React)
}

const App = props => {
  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route
            path="/app"
            render={prop => (
              <AdminLayout
                {...prop}
                authState={props.authState}
                authData={props.authData}
                onStateChange={props.onStateChange}
              />
            )}
          />
          <Redirect from="/" to="/app/dashboard" />
        </Switch>
      </Router>
    </Provider>
  )
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
