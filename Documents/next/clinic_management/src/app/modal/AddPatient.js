"use client";
import React, { useState } from "react";
import { BaseModal } from "./BaseModal";
import { TailSpin } from "react-loader-spinner";
export const AddPatientModal = ({ isOpenModal, handleModalClose, session }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      doctorId: session.user.id,
      fullName: formData.get("fullName"),
      gender: formData.get("gender"),
      bloodType: formData.get("bloodType"),
      phoneNumber: formData.get("phoneNumber"),
      allergies: formData.get("allergies").split(","),
    };
    console.log(data);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage("Error adding patient");
      } else {
        setIsLoading(false);
        setIsError(false);
        setErrorMessage("");
        handleModalClose();
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Error adding patient");
    }
  };
  return (
    <BaseModal
      title={"Add Patient"}
      isOpen={isOpenModal}
      handleClose={handleModalClose}
    >
      <form onSubmit={handleSubmit}>
        {isError && (
          <p className="relative col-span-6 px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded sm:col-span-3">
            {errorMessage}
          </p>
        )}
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <InputField
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Type Full Name"
            required
          />
          <SelectField
            id="gender"
            label="Gender"
            options={[
              { value: "MALE", label: "MALE" },
              { value: "FEMALE", label: "FEMALE" },
            ]}
          />
          <SelectField
            id="bloodType"
            label="Blood Type"
            options={[
              { value: "A_POSITIVE", label: "A+" },
              { value: "A_NEGATIVE", label: "A-" },
              { value: "B_POSITIVE", label: "B+" },
              { value: "B_NEGATIVE", label: "B-" },
              { value: "AB_POSITIVE", label: "AB+" },
              { value: "AB_NEGATIVE", label: "AB-" },
              { value: "O_POSITIVE", label: "O+" },
            ]}
          />
          <InputField
            id="phoneNumber"
            label="Phone Number"
            type="number"
            placeholder="Type Phone Number"
          />
          <div className="sm:col-span-2">
            <InputField
              id="allergies"
              label="Allergies"
              type="text"
              placeholder="Type Allergies separated by comma"
            />
          </div>
        </div>
        <SubmitButton text="Add new patient" isLoading={isLoading} />
      </form>
    </BaseModal>
  );
};

export const InputField = ({ id, label, type, placeholder, required }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export const SelectField = ({ id, label, options }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <select
      name={id}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const TextAreaField = ({ id, label, rows, placeholder }) => (
  <div className="sm:col-span-2">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export const SubmitButton = ({ text, isLoading }) => (
  <button
    type="submit"
    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
          wrapperClass=""
          visible={true}
        />
      </div>
    )) ||
      text}
  </button>
);
