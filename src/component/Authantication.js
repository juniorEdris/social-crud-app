import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { request } from "../utils/axios";
import { EMAIL_REGEX, PWD_REGEX, USER_REGEX } from "../utils/etc";
import AuthForm from "./AuthForm";

const Authantication = () => {
  const { setAuth } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [form, setForm] = useState("Sign in");
  const [userName, setUserName] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.form?.pathname || "/";

  const { mutate } = useMutation({
    mutationKey: "athenticate",
    mutationFn: ({ values, api }) => {
      return request
        .post(api, values)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data?.data?.data?.user));
          setAuth(data?.data?.data?.user);
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log({ error });
          if (form === "Sign in") {
            alert(error.response.data.data.message);
          } else {
            alert(error.response.data.message);
          }
        });
    },
    onSuccess: (data) => {},
    onError: (err) => {
      console.log({ err });
      alert(`${form} unsuccessful!`);
    },
  });

  const handleForm = (e) => {
    setErrormsg("");
    if (!(e.target.name === "userName")) {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setUserName(e.target.value);
    }
  };

  const submitForm = async (e) => {
    setErrormsg("");
    e.preventDefault();

    // if button enabled with JS hack
    const user_name = USER_REGEX.test(values?.userName);
    const email = EMAIL_REGEX.test(values?.email);
    const password = PWD_REGEX.test(values?.password);

    if (!email || !password || !user_name) {
      if (!password) {
        setErrormsg(
          "Password length 6-24 characters.Must include uppercase and lowercase letters, a number and a special character!"
        );
        return;
      }
      setErrormsg("Invalid Entry!");
      return;
    }
    try {
      if (form === "Sign in") {
        await mutate({ values, api: "/api/login" });
      } else {
        await mutate({ values: { ...values, userName }, api: "/api/register" });
      }
    } catch (error) {
      console.log(error);
      if (!error.response) setErrormsg("No Server Response.");
    }
  };

  const actionBtn = (
    <button className="w-full px-4 py-2 tracking-wide text-white bg-sky-700 transition-colors duration-75 transform  rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600">
      {form}
    </button>
  );

  const errorSection = (
    <p className={`${errormsg ? "text-red-500" : ""} my-1 text-sm font-medium`}>
      {errormsg}
    </p>
  );

  return (
    <div className="">
      <div className="">
        <div className="flex items-center justify-center gap-4 my-5">
          <span
            className={`${
              form === "Sign in" ? "text-sky-700 underline" : ""
            } text-xl`}
            tabIndex="0"
            role="button"
            onClick={() => setForm("Sign in")}
          >
            Sign in
          </span>
          <span
            className={`${
              form === "Sign up" ? "text-sky-700 underline" : ""
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
            values={{ ...values, userName }}
            handleForm={handleForm}
            actionBtn={actionBtn}
            onSubmit={submitForm}
            errorMsg={errorSection}
          />
        </div>
      </div>
    </div>
  );
};

export default Authantication;
