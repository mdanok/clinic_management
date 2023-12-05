"use client";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DeletePatientModal } from "@/app/modal/DeletePatient";

export const DeletePatient = ({ patientId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleModalClose = () => {
    setIsOpenModal(false);
  };
  const handleModelOpen = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleModelOpen}
        class="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700"
      >
        <TrashIcon className="w-4 h-4 mr-1" />
        Delete
      </button>
      <DeletePatientModal
        patientId={patientId}
        isOpenModal={isOpenModal}
        handleModalClose={handleModalClose}
      />
    </>
  );
};
