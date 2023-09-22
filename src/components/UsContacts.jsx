import React, { useState } from "react";
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
