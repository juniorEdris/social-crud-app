import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios";
import AuthForm from "./AuthForm";

const Authantication = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [form, setForm] = useState("Sign in");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: "athenticate",
    mutationFn: ({ values, api }) => {
      return request
        .post(api, values)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data?.data?.data?.user));
          navigate("/", { replace: true });
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
    if (!(e.target.name === "userName")) {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setUserName(e.target.value);
    }
  };

  const submitForm = async () => {
    try {
      if (form === "Sign in") {
        await mutate({ values, api: "/api/login" });
      } else {
        await mutate({ values: { ...values, userName }, api: "/api/register" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const actionBtn = (
    <button
      type="button"
      className="w-full px-4 py-2 tracking-wide text-white bg-sky-700 transition-colors duration-75 transform  rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
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
          />
        </div>
      </div>
    </div>
  );
};

export default Authantication;
