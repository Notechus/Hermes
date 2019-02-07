import React from 'react'
import { Storage } from 'aws-amplify'
import defaultImage from 'assets/img/default-avatar.png'

class ImageAvatarNoUpload extends React.Component {
  state = {
    src: '',
  }

  componentDidMount() {
    this._isMounted = true
    this.load()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.image !== this.props.image) {
      this.load()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  load = () => {
    if (!this._isMounted) {
      return
    }
    const { image, userId, level } = this.props
    const key = image ? image.toLowerCase() : '' + '-avatar.png'
    Storage.get(key, { level: level, identityId: userId })
      .then(url => {
        this.setState({
          src: url,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { image } = this.props
    const { src } = this.state
    return (
      <div className="picture-container">
        <div className="picture">
          {image && src ? (
            <img src={src} className="picture-src" alt="..." />
          ) : (
            <img src={defaultImage} className="picture-src" alt="..." />
          )}
        </div>
      </div>
    )
  }
}

export default ImageAvatarNoUpload
