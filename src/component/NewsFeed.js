import React from "react";
import PostCard from "./PostCard";

const NewsFeed = () => {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-medium text-center">Posts</h2>
      </div>
      <div className="">
        <PostCard />
      </div>
    </div>
  );
};

export default NewsFeed;
