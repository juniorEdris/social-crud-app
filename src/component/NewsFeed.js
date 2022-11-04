import { useQuery } from "@tanstack/react-query";
import React from "react";
import { request } from "../utils/axios";
import PostCard from "./PostCard";

const NewsFeed = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await request
        .get("/api/posts")
        .then((res) => res.data.data)
        .catch((err) => console.error(err));
      return response;
    },
  });

  console.log({ data, error });
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-medium text-center">Posts</h2>
      </div>
      {(() => {
        if (isLoading) {
          <div className="flex items-center justify-center">
            <p>Loading!</p>
          </div>;
        }
        if (error) {
          <div className="flex items-center justify-center">
            <p>Somthing is fishy!</p>
          </div>;
        }

        return (
          <div className="">
            {data?.posts?.map((post, idx) => (
              <PostCard key={idx} post={post} />
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default NewsFeed;
