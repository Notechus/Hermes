/*eslint-disable*/
import React from 'react'
import { Container, Row } from 'reactstrap'
// used for making the prop types of this component
import PropTypes from 'prop-types'
import { APPLICATION_VERSION } from 'utils/variables'

class Footer extends React.Component {
  render() {
    return (
      <footer className={'footer' + (this.props.default ? ' footer-default' : '')}>
        <Container fluid={this.props.fluid}>
          <Row>
            <div className="credits mr-auto ml-3">
              <span className="copyright">Version: {APPLICATION_VERSION}</span>
            </div>
            <div className="credits ml-auto">
              <span className="copyright">
                &copy; {1900 + new Date().getYear()}, made with <i className="fa fa-heart heart" />{' '}
                by Notechus
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    )
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
