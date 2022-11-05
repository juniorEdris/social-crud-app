import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "..";
import { request } from "../utils/axios";
import NewsFeed from "./NewsFeed";
import PublishPost from "./PublishPost";

const Home = () => {
  const [post, setPost] = useState({ text: "", file: null });
  const { mutate } = useMutation({
    mutationKey: "publishPost",
    mutationFn: (newPost) => {
      return request
        .post("/api/create/post", newPost)
        .then((data) => queryClient.invalidateQueries(["posts"]));
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
    if (post.text.length > 0 || post.file.length > 0) {
      // get the url/file path
      const imageUrl = await upload();
      const imageName = imageUrl.data.file;
      // mutate the file
      await mutate({ text: post.text, imageName });
    }

    console.log();
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
