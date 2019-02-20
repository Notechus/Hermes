import React from 'react'
// reactstrap components
import { Loading } from 'aws-amplify-react'
import LoadingScreen from 'react-loading-screen'

const BG_COLOR = `url(${require('../../assets/img/bg/fabio-mangione.jpg')})`
const TEXT_COLOR = '#f8f8f8'
const SPINNER_COLOR = '#666666'

class LoadingPage extends Loading {
  componentDidMount() {
    document.body.classList.toggle('login-page')
  }

  componentWillUnmount() {
    document.body.classList.toggle('login-page')
  }

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
              bgColor={BG_COLOR}
              spinnerColor={SPINNER_COLOR}
              textColor={TEXT_COLOR}
              // logoSrc="/apple-icon.png"
              text="Hermes running app"
            >
              <div>Hermes running app</div>
            </LoadingScreen>
          </div>
        </div>
      </div>
    )
  }
}

export default LoadingPage
