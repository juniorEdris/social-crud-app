import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { queryClient } from "../..";
import useAuth from "../../hooks/useAuth";
import { request } from "../../utils/axios";
import MenuElement from "../../utils/headlessUiElement/menu";
import { EnterIcon, ProfileImage } from "../AtomicDesign/Atoms";

const HomeRight = () => {
  const { auth, setAuth } = useAuth();
  const user = auth;

  const { mutate } = useMutation({
    mutationKey: "logout",
    mutationFn: () => {
      return request
        .post("/api/logout")
        .then((data) => {
          localStorage.removeItem("user");
          setAuth(null);
          // navigate("/auth", { replace: true });
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
    <div>
      {user ? (
        <MenuElement menuBtnClasses="w-full" handleButton={logOut}>
          <div className="flex justify-between items-center bg-white drop-shadow-lg rounded-lg my-4 p-2">
            <span className="text-lg font-medium">{user?.name}</span>
            <ProfileImage
              customClasses="w-12 h-12 rounded-full object-cover shadow"
              src={user?.profileImage}
              alt="Profile avatar"
            />
          </div>
        </MenuElement>
      ) : (
        <div className="">
          <Link to="/auth" className="text-lg font-medium">
            <div className="flex justify-center items-center gap-2 bg-white hover:bg-sky-700 hover:text-white drop-shadow-lg rounded-lg my-4 p-2">
              Sign in
              <EnterIcon customClasses="w-8 h-8" />
            </div>
          </Link>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default HomeRight;
