import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "..";
import { request } from "../utils/axios";
import NewsFeed from "./NewsFeed";
import PublishPost from "./PublishPost";

const Home = () => {
  const [post, setPost] = useState({ text: "", image: null });
  const { mutate } = useMutation({
    mutationKey: "publishPost",
    mutationFn: (newTodo) => {
      console.log(newTodo);
      return request
        .post("/api/create/post", newTodo)
        .then((data) => queryClient.invalidateQueries(["posts"]));
    },
  });

  const handlePost = (e) =>
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePostSubmit = async () => {
    if (post.text.length > 0) {
      await mutate({ text: post.text });
    }
  };

  return (
    <div className="grid grid-cols-[300px_minmax(500px,_1fr)_300px] gap-4">
      <div />
      <div className="">
        <div className="mb-4">
          <div>
            <h2 className="text-2xl font-medium text-center">Home</h2>
          </div>
        </div>
        <div className="">
          <PublishPost
            post={post}
            handlePost={handlePost}
            handlePostSubmit={handlePostSubmit}
            activeBtn={post.text.length > 0}
          />
        </div>
        <div className="my-3">
          <NewsFeed />
        </div>
      </div>
      <div />
    </div>
  );
};

export default Home;
