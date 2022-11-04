import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Authantication = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [form, setForm] = useState("Sign in");

  const handleForm = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = () => {
    console.log({ values });
    try {
      if (form === "Sign in") {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const actionBtn = (
    <button
      type="button"
      className="w-full px-4 py-2 tracking-wide text-white bg-purple-700 transition-colors duration-75 transform  rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
      onClick={submitForm}
    >
      {form}
    </button>
  );

  return (
    <div className="">
      <div className="">
        <div className="flex items-center justify-center gap-4 my-5">
          <span
            className={`${
              form === "Sign in" ? "text-purple-700 underline" : ""
            } text-xl`}
            tabIndex="0"
            role="button"
            onClick={() => setForm("Sign in")}
          >
            Sign in
          </span>
          <span
            className={`${
              form === "Sign up" ? "text-purple-700 underline" : ""
            } text-xl`}
            tabIndex="0"
            role="button"
            onClick={() => setForm("Sign up")}
          >
            Sign up
          </span>
        </div>
        <div>
          <AuthForm
            label={form}
            values={values}
            handleForm={handleForm}
            actionBtn={actionBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default Authantication;
