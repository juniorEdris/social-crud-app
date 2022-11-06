import { Link } from "react-router-dom";

const Container = ({ children }) => {
  return (
    <div className="w-11/12 mx-auto py-10 min-h-screen">
      <div className="flex items-center justify-center gap-4 mb-5">
        <Link to="/" className="font-medium hover:text-slate-300">
          Home
        </Link>
        <Link to="/find-friends" className="font-medium hover:text-slate-300">
          Find Freinds
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
