import { Link } from "react-router-dom";
import { FindFriendsIcon, HomeIcon } from "./AtomicDesign/Atoms";
import { useLocation } from "react-router-dom";

const Container = ({ children }) => {
  const { pathname = "/" } = useLocation();
  return (
    <div className="w-11/12 mx-auto py-10 min-h-screen">
      <div className="flex items-center justify-center gap-4 mb-5 bg-gray-100 py-3 rounded-md">
        <Link to="/" className="font-medium">
          <div
            className={`${
              pathname === "/" ? "bg-sky-700 text-white" : ""
            } border p-2 hover:bg-sky-700 rounded-lg hover:text-white`}
          >
            <HomeIcon customClasses={`w-8 h-8`} />
          </div>
        </Link>
        <Link to="/find-friends" className="font-medium">
          <div
            className={`${
              pathname === "/find-friends" ? "bg-sky-700 text-white" : ""
            } border p-2 hover:bg-sky-700 rounded-lg hover:text-white`}
          >
            <FindFriendsIcon customClasses="w-8 h-8" />
          </div>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
