import React, { useState } from "react";
import GenderCheckBox from "../../components/GenderCheckBox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await signup(inputs);
    if (!response) {
      setInputs((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    } else {
      console.log(inputs);
    }
  };
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-border backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* HEADING */}
        <h1 className="text-2xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center align-center gap-4 mt-10"
        >
          {/* FULLNAME */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="fullName"
              className="grow"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={handleChange}
            />
          </label>
          {/* USERNAME */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="userName"
              className="grow"
              placeholder="Username"
              value={inputs.userName}
              onChange={handleChange}
            />
          </label>
          {/* PASSWORD */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
          {/* CONFIRM PASSWORD */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="confirmPassword"
              className="grow"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </label>
          {/* Gender */}
          <GenderCheckBox inputs={inputs} handleChange={handleChange} />
          {/* Button */}
          <div>
            <button className="btn btn-block btn-sm mt-2 hover:cursor-pointer">
              Sign Up
            </button>
          </div>
        </form>
        <div className="my-2">
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block hover:cursor-pointer "
          >
            Login into an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
