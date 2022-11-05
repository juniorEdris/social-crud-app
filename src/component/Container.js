import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { queryClient } from "..";
import { request } from "../utils/axios";

const Container = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [auth, setAuth] = useState(user ? user : null);

  const { mutate } = useMutation({
    mutationKey: "publishPost",
    mutationFn: () => {
      return request
        .post("/api/logout")
        .then((data) => {
          localStorage.removeItem("user");
          setAuth(null);
          navigate("/auth");
          queryClient.invalidateQueries(["posts"]);
        })
        .catch((error) => {
          console.log({ error });
          alert(`Logout unsuccessful!`);
        });
    },
    onError: (err) => {
      console.log({ err });
      alert(`Logout unsuccessful!`);
    },
  });

  console.log();

  const logOut = async () => {
    await mutate();
  };
  return (
    <div className="w-11/12 mx-auto py-10 min-h-screen">
      <div className="flex items-center justify-center gap-4 mb-5">
        <Link to="/" className="font-medium hover:text-slate-300">
          Home
        </Link>
        {!user ? (
          <Link to="/auth" className="font-medium hover:text-slate-300">
            Sign in
          </Link>
        ) : (
          <span
            className="font-medium hover:text-slate-300"
            tabIndex={0}
            role={"button"}
            onClick={logOut}
          >
            Sign out
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
