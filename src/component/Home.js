import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "..";
import { request } from "../utils/axios";
import NewsFeed from "./NewsFeed";
import PublishPost from "./PublishPost";

const Home = () => {
  const [post, setPost] = useState({ text: "", file: null });
  console.log({ post });
  const { mutate } = useMutation({
    mutationKey: "publishPost",
    mutationFn: (newPost) => {
      console.log(newPost);
      return request
        .post("/api/create/post", newPost)
        .then((data) => queryClient.invalidateQueries(["posts"]));
    },
  });

  const handlePost = (e) => {
    if (e.target.name !== "file") {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setPost((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
  };

  const upload = async () => {
    console.log({ dd: post });
    const formData = new FormData();
    formData.append("file", post.file);
    const imageRes = await request.post("/api/upload", formData);
    return imageRes;
  };

  const handlePostSubmit = async () => {
    if (post.text.length > 0 || post.file.length > 0) {
      const imageUrl = await upload();
      console.log(imageUrl);
      // await mutate({ text: post.text });
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
