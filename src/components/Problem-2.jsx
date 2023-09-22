import React, { useState } from "react";
import ModalA from "./Modal/ModalA";

const Problem2 = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="container">
      <ModalA modalShow={modalShow} setModalShow={setModalShow} />
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setModalShow(true)}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button">
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
