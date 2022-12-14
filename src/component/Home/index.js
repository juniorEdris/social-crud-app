import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../..";
import { request } from "../../utils/axios";
import NewsFeed from "./NewsFeed";
import PublishPost from "../Post/PublishPost";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
import useAuthStore from "../../hooks/useAuthStore";

const Home = () => {
  const { auth } = useAuthStore((state) => state);
  const [post, setPost] = useState({ text: "", file: null });

  // Mutation
  const { mutate } = useMutation({
    mutationKey: "publishPost",
    mutationFn: (newPost) => {
      return request.post("/api/create/post", newPost).then((data) => {
        queryClient.invalidateQueries(["posts"]);
      });
    },
    onSuccess: () => {
      setPost((prev) => ({ ...prev, text: "", file: null }));
    },
    onError: (err) => {
      console.log({ err });
      alert("Mutation unsuccessful!");
    },
  });

  const handlePost = (e) => {
    if (e.target.name !== "file") {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
  };

  // upload to main destination and get the url/file path
  const upload = async () => {
    if (post.file) {
      const formData = new FormData();
      formData.append("file", post.file);
      const imageRes = await request.post("/api/upload", formData);
      return imageRes;
    }
    return "";
  };

  const handlePostSubmit = async () => {
    if (post.text.length > 0 || post.file) {
      // get the url/file path
      const imageUrl = await upload();
      const imageName = imageUrl ? imageUrl.data.file : "";
      // mutate the file
      await mutate({ text: post.text, imageName });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[300px_minmax(500px,_1fr)_300px] gap-4 ">
      <div className="px-5 hidden lg:block">
        <HomeLeft />
      </div>
      <div className="px-5">
        <div className="mb-4">
          <div>
            <h2 className="text-2xl font-medium text-center">News Feed</h2>
          </div>
        </div>
        {!auth ? null : (
          <div className="">
            <PublishPost
              post={post}
              handlePost={handlePost}
              handlePostSubmit={handlePostSubmit}
              activeBtn={post.text.length > 0 || post.file}
            />
          </div>
        )}
        <div className="my-3">
          <NewsFeed />
        </div>
      </div>
      <div className="px-5 hidden md:block">
        {" "}
        <HomeRight />
      </div>
    </div>
  );
};

export default Home;
