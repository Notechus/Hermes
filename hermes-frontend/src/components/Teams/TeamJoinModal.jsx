import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

const TeamJoinModal = ({ isOpen, toggle, submit }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <div className="modal-header justify-content-center">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={toggle}
        >
          <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title">Join team</h5>
      </div>
      <ModalBody>Please provide join code:</ModalBody>
      <ModalFooter>
        <div className="ml-auto mr-auto">
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="success" onClick={submit}>
            Join
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default TeamJoinModal
