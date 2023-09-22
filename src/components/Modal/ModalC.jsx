import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { getUsContacts } from "../../Apis/contacts";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalB = ({ modalShow, setModalShow }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [contactData, setContactData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEven, setIsEven] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const fetchContacts = (pageNumber, search) => {
    setIsLoading(true);
    getUsContacts(pageNumber, search)
      .then((res) => {
        setContactData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchContacts(page, searchValue);
  }, []);

  const handleContactSearch = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    fetchContacts(page, query);
  };

  const handlePageChange = (type) => {
    if (type === "next") {
      setPage(page + 1);
      fetchContacts(page + 1, searchValue);
    } else {
      setPage(page - 1);
      fetchContacts(page - 1, searchValue);
    }
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => {
          navigate("/problem-2");
          setModalShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            US Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <input
              className="w-100 px-2 py-1"
              type="text"
              onChange={handleContactSearch}
              placeholder="Search here..."
            />
          </div>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          ) : contactData?.results?.length > 0 ? (
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Phone</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {isEven
                  ? contactData?.results
                      ?.filter((fill) => fill.id % 2 === 0)
                      .map((data, i) => (
                        <tr key={i}>
                          <td>{data?.phone}</td>
                          <td>{data?.country?.name}</td>
                        </tr>
                      ))
                  : contactData?.results?.map((data, i) => (
                      <tr key={i}>
                        <td>{data?.phone}</td>
                        <td>{data?.country?.name}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : (
            <p className="fw-bold text-center my-5">No contact data found!</p>
          )}
          {contactData?.results?.length > 0 && (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <input
                  onChange={(e) => setIsEven(e.target.checked)}
                  type="checkbox"
                  name=""
                  id=""
                />
                <label>Only Even</label>s
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-a"
            onClick={() => {
              navigate("/all-contacts");
            }}
          >
            Button A
          </Button>
          <Button
            className="button-b"
            onClick={() => {
              navigate("/us-contacts");
            }}
          >
            Button B
          </Button>
          <Button
            className="button-c"
            onClick={() => {
              navigate("/problem-2");
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

export default ModalB;
