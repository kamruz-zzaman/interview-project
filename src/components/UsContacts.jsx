import React, { useState } from "react";
import ModalA from "./Modal/ModalA";
import ModalB from "./Modal/ModalB";

const UsContacts = () => {
  const [modalBShow, setModalBShow] = useState(true);
  return (
    <>
      <ModalB modalShow={modalBShow} setModalShow={setModalBShow} />
    </>
  );
};

export default UsContacts;
