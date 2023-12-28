import React from "react";
import FolderModal from "../modals/folder-modal";
import PlanModal from "../modals/plan-modal";

const ModalProvider = () => {
  return (
    <>
      <FolderModal />
      <PlanModal />
    </>
  );
};

export default ModalProvider;
