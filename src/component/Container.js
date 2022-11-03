import React from "react";
import { Link } from "react-router-dom";

const Container = ({ children }) => {
  return (
    <div className="w-4/5 mx-auto py-10 min-h-screen">
      <div className="flex items-center justify-center gap-4 mb-5">
        <Link to="/" className="font-medium hover:text-slate-300">
          Home
        </Link>
        <Link to="/auth" className="font-medium hover:text-slate-300">
          Sign in
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
