"use client";
import React, { useState } from "react";
import { BaseModal } from "./BaseModal";
import { TailSpin } from "react-loader-spinner";
import { TrashIcon } from "@heroicons/react/24/outline";

export const DeletePatientModal = ({
  isOpenModal,
  handleModalClose,
  patientId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/patient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: patientId }),
      });

      if (!response.ok) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        handleModalClose();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <BaseModal
      title={"Delete Patient"}
      isOpen={isOpenModal}
      handleClose={handleModalClose}
    >
      <div className="flex flex-col items-center justify-center">
        <TrashIcon className="w-16 h-16 text-gray-300" />
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this Patient?
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={handleModalClose}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            {(isLoading && (
              <div className="flex items-center justify-center">
                <TailSpin
                  height="30"
                  width="30"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperclassName=""
                  visible={true}
                />
              </div>
            )) ||
              "Yes, I'm sure"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
