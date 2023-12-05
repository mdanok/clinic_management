"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AddPatientModal } from "@/app/modal/AddPatient";

export const AddPatient = ({ session }) => {
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
        class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        <PlusIcon className="w-4 h-4 mr-1" />
        Add Patient
      </button>
      <AddPatientModal
        session={session}
        isOpenModal={isOpenModal}
        handleModalClose={handleModalClose}
      />
    </>
  );
};
