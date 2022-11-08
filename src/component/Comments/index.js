import React, { useState } from "react";
import { Heading1, MutateButton, TextArea } from "../AtomicDesign/Atoms";
import CommentCard from "./CommentCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { request } from "../../utils/axios";
import { size } from "lodash";
import { queryClient } from "../..";

const Comments = ({ id }) => {
  const [commentText, setCommentText] = useState("");

  // get comments
  const { isLoading, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await request
        .get(`/api/comments/${id}`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => console.error(err));
      return response;
    },
  });

  // Mutation
  const { mutate, error } = useMutation({
    mutationKey: "mutateComments",
    mutationFn: async (newComment) => {
      return await request
        .post(`/api/create-comment/${id}`, newComment)
        .then(async (data) => {
          await queryClient.invalidateQueries(["comments"]);
        })
        .finally(() => setCommentText(""));
    },
    onError: (err) => {
      console.log({ err });
      alert("Mutation unsuccessful!");
    },
  });

  const handleComment = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async () => {
    await mutate({ comment: commentText });
  };

  return (
    <div>
      <div className="">
        <div className="mb-3">
          <Heading1 heading="Comments" />
        </div>
        {size(data?.comments) > 1 ? (
          <div className="">
            <CommentCard comments={data?.comments} />
          </div>
        ) : null}

        {isLoading ? "Comment is loading" : null}

        <div className="">
          <div className="my-2">
            <TextArea
              rows={3}
              customClasses="block w-full text-sm text-gray-800 bg-white border-2 p-2 resize-none rounded-lg"
              handleTextarea={handleComment}
              value={commentText}
              placeholder={"write your comment"}
            />
          </div>
          {error ? <small className="text-red-700">{error}</small> : null}
          <div className="">
            <MutateButton
              title="Publish post"
              customClasses={`focus:ring-blue-20 text-sm font-medium hover:bg-blue-800 disabled:bg-blue-200 disabled:hover:disabled:bg-blue-200 text-white bg-blue-700 `}
              disabled={size(commentText) < 0}
              handleMutate={handleCommentSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
