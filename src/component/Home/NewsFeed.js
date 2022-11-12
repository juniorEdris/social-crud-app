import { useQuery } from "@tanstack/react-query";
import React from "react";
import { request } from "../../utils/axios";
import { SpinIcon } from "../AtomicDesign/Atoms";
import PostCard from "../Post/PostCard";

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

  return (
    <div>
      {(() => {
        if (isLoading) {
          <div className="flex items-center justify-center">
            <SpinIcon customClasses="h-11 w-11" />
          </div>;
        }
        if (error) {
          <div className="flex items-center justify-center">
            <p>Something is fishy!</p>
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
