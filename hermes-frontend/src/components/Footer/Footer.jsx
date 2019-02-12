/*eslint-disable*/
import React from 'react'
import { Container, Row } from 'reactstrap'
// used for making the prop types of this component
import PropTypes from 'prop-types'

const Footer = ({ def, fluid, version }) => {
  return (
    <footer className={'footer' + (def ? ' footer-default' : '')}>
      <Container fluid={fluid}>
        <Row>
          <div className="credits mr-auto ml-3">
            <span className="copyright">Version: {version}</span>
          </div>
          <div className="credits ml-auto">
            <span className="copyright">
              &copy; {1900 + new Date().getYear()}, made with <i className="fa fa-heart heart" /> by
              Notechus
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  def: PropTypes.bool,
  fluid: PropTypes.bool,
  version: PropTypes.string,
}

export default React.memo(Footer)
