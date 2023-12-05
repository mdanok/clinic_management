"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export const Form = ({ userData }) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formState, setFormState] = useState({
    id: userData.data.id,
    firstName: userData.data.firstName,
    lastName: userData.data.lastName,
    phoneNumber: userData.data.phoneNumber,
    specialization: userData.data.specialization,
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleChange = (e) => {
    setIsFormChanged(true);
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateData(formState)) {
      try {
        const response = await axios.put("/api/user", formState);
        setIsSuccess(true);
        setSuccessMessage("Profile updated successfully");
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setErrorMessage("Error updating profile");
        console.error("Error submitting form:", error);
      }
    } else {
      setIsError(true);
      console.error("Validation failed");
    }
  };

  const validateData = (data) => {
    const nameRegex = /^[a-zA-Z]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.firstName.trim() || !data.lastName.trim()) {
      setErrorMessage("First Name and Last Name cannot be empty.");
      return false;
    }

    if (!nameRegex.test(data.firstName) || !nameRegex.test(data.lastName)) {
      setErrorMessage("First Name and Last Name should contain only letters.");
      return false;
    }

    if (data.phoneNumber && !phoneRegex.test(data.phoneNumber)) {
      setErrorMessage("Invalid phone number format.");
      return false;
    }

    if (!data.specialization) {
      setErrorMessage("Please select a specialization.");
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-6">
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          required
        />

        <InputField
          label="Phone Number"
          type="text"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleChange}
        />
        <DropdownField
          label="Specialization"
          name="specialization"
          value={formState.specialization}
          options={Specialization}
          onChange={handleChange}
          required
        />
        {isError && (
          <p className="relative col-span-6 px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded sm:col-span-3">
            {errorMessage}
          </p>
        )}
        {isSuccess && (
          <p className="relative col-span-6 px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded sm:col-span-3">
            {successMessage}
          </p>
        )}

        <div className="col-span-6 sm:col-full">
          <button
            disabled={!isFormChanged}
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="submit"
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
              "Save all"}
          </button>
        </div>
      </div>
    </form>
  );
};

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="col-span-6 sm:col-span-3">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      name={name}
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const DropdownField = ({ label, name, value, options, onChange, required }) => (
  <div className="col-span-6 sm:col-span-3">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <select
      name={name}
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      value={value}
      onChange={onChange}
      required={required}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Specialization = [
  "UNKNOWN",
  "CARDIOLOGIST",
  "DERMATOLOGIST",
  "GASTROENTEROLOGIST",
  "NEUROLOGIST",
  "ONCOLOGIST",
  "OPHTHALMOLOGIST",
  "ORTHOPEDIC_SURGEON",
  "PEDIATRICIAN",
  "PSYCHIATRIST",
  "RADIOLOGIST",
  "UROLOGIST",
  "OBSTETRICIAN_GYNECOLOGIST",
  "PULMONOLOGIST",
  "ENDOCRINOLOGIST",
  "HEMATOLOGIST",
  "INFECTIOUS_DISEASE_SPECIALIST",
  "RHEUMATOLOGIST",
  "OTOLARYNGOLOGIST",
  "NUTRITIONIST",
  "ALLERGIST",
  "PATHOLOGIST",
  "ANESTHESIOLOGIST",
  "PHYSIATRIST",
  "DENTIST",
  "OPTOMETRIST",
  "VETERINARIAN",
  "OTHER",
];
