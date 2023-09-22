import React, { useState } from "react";
import ModalA from "./Modal/ModalA";

const AllContacts = () => {
  const [modalAShow, setModalAShow] = useState(true);
  return (
    <>
      <ModalA modalShow={modalAShow} setModalShow={setModalAShow} />
    </>
  );
};

export default AllContacts;
