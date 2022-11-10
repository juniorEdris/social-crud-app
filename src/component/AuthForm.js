import React from "react";

const AuthForm = ({
  label = "Sign in",
  values,
  handleForm,
  actionBtn,
  onSubmit,
  errorMsg,
}) => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        {/* <h1 className="text-3xl font-semibold text-center text-sky-700 underline">
          {label}
        </h1> */}
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              autoComplete="off"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-blue-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={values?.email}
              name="email"
              onChange={(e) => handleForm(e)}
            />
          </div>
          {label !== "Sign in" ? (
            <div className="mb-2">
              <label
                htmlFor="userName"
                className="block text-sm font-semibold text-gray-900"
              >
                User name
              </label>
              <input
                type="text"
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-blue-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={values?.userName}
                name="userName"
                onChange={(e) => handleForm(e)}
              />
            </div>
          ) : null}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              onChange={(e) => handleForm(e)}
              value={values.password}
            />
          </div>
          {errorMsg}
          <div className="mt-6">{actionBtn}</div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
