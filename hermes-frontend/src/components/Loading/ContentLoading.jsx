import React from 'react'
import LoadingScreen from 'react-loading-screen'

const ContentLoading = ({ text }) => {
  return (
    <>
      <div className="content content-loading">
        <div className="ml-auto mr-auto">
          <LoadingScreen
            loading={true}
            bgColor="#f4f3ef"
            spinnerColor="#666666"
            textColor="#030303"
            text="Loading"
          >
            <div>{text}</div>
          </LoadingScreen>
        </div>
      </div>
    </>
  )
}

export default React.memo(ContentLoading)
