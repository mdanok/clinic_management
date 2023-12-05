"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <section className="overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

const Logo = () => (
  <a
    href="#"
    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
  >
    <Image
      width={32}
      height={32}
      className="w-8 h-8 ml-2"
      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
      alt="logo"
    />
    MediManage
  </a>
);

const FormInput = ({ id, label, type, placeholder, error, onChange }) => (
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
      className={`bg-gray-50 border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      placeholder={placeholder}
      required=""
      onChange={onChange}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const SelectComponent = ({ id, label, options }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <select
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormButton = ({ text, isSumbmited }) => (
  <button
    type="submit"
    disabled={isSumbmited}
    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    {(isSumbmited && (
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

const TermsAndConditions = ({ error, onChange }) => (
  <>
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="terms"
          aria-describedby="terms"
          type="checkbox"
          onClick={onChange}
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
          required
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor="terms"
          className="font-light text-gray-500 dark:text-gray-300"
        >
          I accept the{" "}
          <a
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            href="#"
          >
            Terms and Conditions
          </a>
        </label>
      </div>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </>
);

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "MALE",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [generalErrorMessage, setGeneralErrorMessage] = useState();
  const [generalError, setGeneralError] = useState(false);
  const [submited, setSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Helper function to check if a field is empty
    const addErrorIfEmpty = (field, errorMessage) => {
      if (!formData[field]) newErrors[field] = errorMessage;
    };

    // Check for empty fields
    addErrorIfEmpty("firstName", "First name is required");
    addErrorIfEmpty("lastName", "Last name is required");
    addErrorIfEmpty("email", "Email is required");
    addErrorIfEmpty("password", "Password is required");
    addErrorIfEmpty("confirmPassword", "Confirm password is required");

    // Password specific validations
    if (
      formData.password &&
      (formData.password.length < 8 ||
        formData.password !== formData.confirmPassword)
    ) {
      newErrors.password =
        formData.password.length < 8
          ? "Password must be at least 8 characters"
          : "Passwords do not match";
      newErrors.confirmPassword =
        formData.confirmPassword.length < 8
          ? "Password must be at least 8 characters"
          : "Passwords do not match";
    }

    // Email validation
    if (formData.email && !/^[^@]+@[^@]+\.[^@]{2,}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmited(true);

      const response = await axios.post("/api/register", formData);
      if (response.status === 200) {
        redirect("/login?form=register");
      }
    } catch (error) {
      setSubmited(false);
      setGeneralError(true);
      setGeneralErrorMessage(error.response.data.message);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <ErrorMessage message={generalErrorMessage} isShown={generalError} />
      <FormInput
        id="firstName"
        label="Your First Name"
        type="text"
        placeholder="Ahmed"
        error={errors.firstName}
        onChange={handleChange}
      />
      <FormInput
        id="lastName"
        label="Your Last Name"
        type="text"
        placeholder="Mohammed"
        error={errors.lastName}
        onChange={handleChange}
      />
      <SelectComponent
        id="gender"
        label="Your Gender"
        onChange={handleChange}
        options={[
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
        ]}
      />
      <FormInput
        id="email"
        label="Your Email"
        type="email"
        placeholder="name@company.com"
        error={errors.email}
        onChange={handleChange}
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password}
        onChange={handleChange}
      />
      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword}
        onChange={handleChange}
      />
      <TermsAndConditions
        onChange={handleChange}
        error={errors.termsAccepted}
      />
      <FormButton text="Create an Account" isSumbmited={submited} />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

const ErrorMessage = ({ message, isShown }) => {
  return (
    <div
      className={`${
        isShown ? "block" : "hidden"
      } bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
