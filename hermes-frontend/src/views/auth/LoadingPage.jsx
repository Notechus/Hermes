import React from 'react'
// reactstrap components
import { Loading } from 'aws-amplify-react'
import LoadingScreen from 'react-loading-screen'

class LoadingPage extends Loading {
  componentDidMount() {
    document.body.classList.toggle('login-page')
  }

  componentWillUnmount() {
    document.body.classList.toggle('login-page')
  }

  showComponent = theme => {}

  render() {
    if (this.props.authState !== 'loading') {
      return null
    }

    return (
      <div className="wrapper wrapper-full-page" ref="fullPages">
        <div className="content">
          <div className="ml-auto mr-auto">
            <LoadingScreen
              loading={true}
              bgColor="#f1f1f1"
              spinnerColor="#9ee5f8"
              textColor="#676767"
              logoSrc="/apple-icon.png"
              text="Hermes running app"
            >
              <div>Hermes running app</div>
            </LoadingScreen>
          </div>
          <div
            className="full-page-background"
            style={{
              backgroundImage: `url(${require('../../assets/img/bg/fabio-mangione.jpg')})`,
            }}
          />
        </div>
      </div>
    )
  }
}

export default LoadingPage
