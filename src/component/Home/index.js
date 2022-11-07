import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../..";
import { request } from "../../utils/axios";
import NewsFeed from "../NewsFeed";
import PublishPost from "../PublishPost";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

const Home = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

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
    <div className="grid grid-cols-[300px_minmax(500px,_1fr)_300px] gap-4 ">
      <div className="px-5">
        <HomeLeft />
      </div>
      <div className="px-5">
        <div className="mb-4">
          <div>
            <h2 className="text-2xl font-medium text-center">News Feed</h2>
          </div>
        </div>
        {!user ? null : (
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
      <div className="px-5">
        {" "}
        <HomeRight />
      </div>
    </div>
  );
};

export default Home;
