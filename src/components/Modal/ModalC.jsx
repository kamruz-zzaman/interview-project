import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

const ModalC = ({ modalShow, setModalShow, data }) => {
  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.id}</td>
                <td>{data?.phone}</td>
                <td>{data?.country?.name}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-c"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalC;
