import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { getAllContacts } from "../../Apis/contacts";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalC from "./ModalC";

const ModalA = ({ modalShow, setModalShow }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [contactData, setContactData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEven, setIsEven] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //   const modalContentRef = useRef(null);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedData, setSelectedData] = useState(false);

  //   calling api here
  const fetchContacts = (pageNumber, search) => {
    setIsLoading(true);
    getAllContacts(pageNumber, search)
      .then((res) => {
        setContactData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   when render calling the api
  useEffect(() => {
    fetchContacts(page, searchValue);
  }, []);

  //   after search anything calling api
  const handleContactSearch = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    setTimeout(() => {
      fetchContacts(page, query);
    }, 1000);
  };

  // after hitting enter for make search
  const handleSeachSubmit = (e) => {
    e.preventDefault();
    fetchContacts(page, searchValue);
  };

  //   for change perpage data
  const handlePageChange = (type) => {
    console.log("dat");
    if (type === "next") {
      setPage(page + 1);
      fetchContacts(page + 1, searchValue);
    } else {
      setPage(page - 1);
      fetchContacts(page - 1, searchValue);
    }
  };

  //   const handleScroll = () => {
  //     handlePageChange("next");
  //   };

  // for show the details modal
  const handleDetailsView = (data) => {
    setSelectedData(data);
    setDetailsModalShow(true);
  };

  return (
    <>
      <ModalC
        modalShow={detailsModalShow}
        setModalShow={setDetailsModalShow}
        data={selectedData}
      />
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
            All Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body-height"
          onScroll={handleScroll}
          //   ref={modalContentRef}
        >
          <form onSubmit={handleSeachSubmit}>
            <input
              className="w-75 px-2 py-1"
              type="text"
              onChange={handleContactSearch}
              placeholder="Search here..."
            />
            <Button className="ms-4">Search</Button>
          </form>
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
                        <tr
                          className="selectable-row"
                          onClick={() => handleDetailsView(data)}
                          key={i}
                        >
                          <td>{data?.phone}</td>
                          <td>{data?.country?.name}</td>
                        </tr>
                      ))
                  : contactData?.results?.map((data, i) => (
                      <tr
                        className="selectable-row"
                        onClick={() => handleDetailsView(data)}
                        key={i}
                      >
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
              <div>
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

export default ModalA;
