import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { queryClient } from "../..";
import { request } from "../../utils/axios";
import { placeHolderImage } from "../../utils/etc";
import MenuElement from "../../utils/headlessUiElement/menu";

const HomeRight = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [auth, setAuth] = useState(user ? user : null);

  const { mutate } = useMutation({
    mutationKey: "logout",
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
    <div>
      {user ? (
        <MenuElement menuBtnClasses="w-full" handleButton={logOut}>
          <div className="flex justify-between items-center bg-white drop-shadow-lg rounded-lg my-4 p-2">
            <span className="text-lg font-medium">{user?.name}</span>
            {user.profileImage ? (
              <img
                className="w-12 h-12 rounded-full object-cover shadow"
                src={user?.profileImage}
                alt="Profile avatar"
                loading="lazy"
              />
            ) : (
              <img
                className="w-12 h-12 rounded-full object-cover shadow"
                src={placeHolderImage}
                alt="Profile avatar"
                loading="lazy"
              />
            )}
          </div>
        </MenuElement>
      ) : (
        <div className="flex justify-center items-center bg-white drop-shadow-lg rounded-lg my-4 p-2">
          <Link to="/auth" className="text-lg font-medium">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeRight;
