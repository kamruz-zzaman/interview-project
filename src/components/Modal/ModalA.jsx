import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllContacts } from "../../Apis/contacts";
import { Spinner } from "react-bootstrap";

const ModalA = ({ modalShow, setModalShow }) => {
  const [page, setPage] = useState(1);
  const [contactData, setContactData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = (pageNumber) => {
    setIsLoading(true);
    getAllContacts(pageNumber)
      .then((res) => {
        setContactData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchContacts(page);
  }, []);

  const handlePageChange = (type) => {
    if (type === "next") {
      setPage(page + 1);
      fetchContacts(page + 1);
    } else {
      setPage(page - 1);
      fetchContacts(page - 1);
    }
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            All Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Phone</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {contactData?.results?.map((data, i) => (
                  <tr key={i}>
                    <td>{data?.phone}</td>
                    <td>{data?.country?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="d-flex justify-content-end align-items-center">
            <Button
              disabled={contactData?.previous === null}
              onClick={() => handlePageChange("previous")}
              variant="secondary"
              className="me-2"
            >
              Previous Page
            </Button>
            <Button
              disabled={contactData?.next === null}
              onClick={() => handlePageChange("next")}
              variant="primary"
            >
              Next Page
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-a">Button A</Button>
          <Button className="button-b">Button B</Button>
          <Button className="button-c" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalA;
