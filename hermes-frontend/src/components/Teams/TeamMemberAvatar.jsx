import React from 'react'
import { Storage } from 'aws-amplify'
import defaultImage from 'assets/img/default-avatar.png'

class TeamMemberAvatar extends React.Component {
  state = {
    src: '',
  }

  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.image !== this.props.image) {
      this.load()
    }
  }

  load = () => {
    const { image, userId } = this.props
    const key = (image ? image.toLowerCase() : '') + '-avatar.png'
    Storage.get(key, { level: 'protected', identityId: userId })
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
        <div className="avatar">
          {image && src ? (
            <img
              src={this.state.src}
              className="img-circle img-no-padding img-responsive"
              alt="..."
            />
          ) : (
            <img
              src={defaultImage}
              className="img-circle img-no-padding img-responsive"
              alt="..."
            />
          )}
        </div>
      </div>
    )
  }
}

export default TeamMemberAvatar
