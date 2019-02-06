import React from 'react'
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalFooter } from 'reactstrap'

// const x = {
//   completionDate: '2018-12-10', //datepicker
//   distance: '', //sumaric distance
//   time: '', //sumaric time
//   hr: '', // sumaric HR
//   pace: '', //
// }

const SingleTrainingPage = ({ opened, training, toggle, save, onChange }) => {
  return (
    <Modal isOpen={opened} toggle={toggle}>
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
        <h5 className="modal-title">Edit training</h5>
      </div>
      <ModalBody>
        <Card>
          <CardHeader>{training ? training.trainingId : ''}</CardHeader>
          <CardBody>
            {training &&
              training.activities.map((prop, key) => <p key={key}>{prop.description}</p>)}
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <div className="ml-auto mr-auto">
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="success" onClick={save}>
            Save changes
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default SingleTrainingPage
