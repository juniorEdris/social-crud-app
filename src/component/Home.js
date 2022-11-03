import { useState } from "react";
import NewsFeed from "./NewsFeed";
import PublishPost from "./PublishPost";

const Home = () => {
  const [post, setPost] = useState({ text: "", image: null });

  const handlePost = (e) =>
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePostSubmit = () => {
    console.log({ post });
  };

  return (
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
        />
      </div>
      <div className="my-3">
        <NewsFeed />
      </div>
    </div>
  );
};

export default Home;
