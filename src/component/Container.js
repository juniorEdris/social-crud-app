import { Link, useNavigate } from "react-router-dom";
import {
  EnterIcon,
  ExitIcon,
  FindFriendsIcon,
  HomeIcon,
} from "./AtomicDesign/Atoms";
import { useLocation } from "react-router-dom";
import { queryClient } from "..";
import { request } from "../utils/axios";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const Container = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const { pathname = "/" } = useLocation();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: "logout",
    mutationFn: () => {
      return request
        .post("/api/logout")
        .then((data) => {
          localStorage.removeItem("user");
          // navigate("/auth", { replace: true });
          setAuth(null);
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

  const logOut = async () => {
    await mutate();
  };

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
        <Link to="/profile" className="font-medium">
          <div
            className={`${
              pathname === "/profile" ? "bg-sky-700 text-white" : ""
            } border p-2 hover:bg-sky-700 rounded-lg hover:text-white`}
          >
            <FindFriendsIcon customClasses="w-8 h-8" />
          </div>
        </Link>

        {!auth ? (
          <Link to="/auth" className="font-medium md:hidden">
            <div
              className={`${
                pathname === "/auth" ? "bg-sky-700 text-white" : ""
              } border p-2 hover:bg-sky-700 rounded-lg hover:text-white`}
            >
              <EnterIcon customClasses="w-8 h-8" />
            </div>
          </Link>
        ) : (
          <span
            tabIndex={0}
            role="button"
            className="font-medium cursor-pointer md:hidden"
            onClick={logOut}
          >
            <div
              className={`border p-2 hover:bg-sky-700 rounded-lg hover:text-white`}
            >
              <ExitIcon customClasses="w-8 h-8" />
            </div>
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
