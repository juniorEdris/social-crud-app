import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../..";
import useAuthStore from "../../hooks/useAuthStore";
import { request } from "../../utils/axios";
import PostOptions from "../../utils/headlessUiElement/postOptions";
import {
  AgoMoment,
  CloseButton,
  CommentOutline,
  CommentSolid,
  Heading1,
  Image,
  Input,
  LikeOutline,
  LikeSolid,
  MutateButton,
  OptionsIcon,
  PrimaryText,
  ProfileImage,
  ProfileNameHeading,
  SpinIcon,
} from "../AtomicDesign/Atoms";
import Modal from "../AtomicDesign/Template/Modal";
import Comments from "../Comments";

const PostCard = ({ post }) => {
  const { auth } = useAuthStore((state) => state);
  const [postText, setPostText] = useState(post?.text || "");
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: "postDelete",
    mutationFn: (id) => {
      return request
        .post(`/api/delete/post/${id}`)
        .then(async (data) => {
          await queryClient.invalidateQueries(["posts"]);
          await setDeleteModalOpen((prev) => !prev);
        })
        .catch((error) => {
          console.log({ error });
          alert(`Post delete unsuccessful!`);
        });
    },
    onError: (err) => {
      console.log({ err });
      alert(`Post delete unsuccessful!`);
    },
  });
  const { mutate: updatePost, isLoading: updatePostLoading } = useMutation({
    mutationKey: "postUpdate",
    mutationFn: ({ id, text }) => {
      return request
        .post(`/api/update/post/${id}`, { text: text.toString() })
        .then(async (data) => {
          await queryClient.invalidateQueries(["posts"]);
          await setUpdateModal((prev) => !prev);
        })
        .catch((error) => {
          console.log({ error });
          alert(`Post update unsuccessful!`);
        });
    },
    onError: (err) => {
      console.log({ err });
      alert(`Post update unsuccessful!`);
    },
  });

  const handlePostDelete = async () => {
    await mutate(post?._id);
  };

  const handleUpdatePost = async () => {
    await updatePost({ id: post?._id, text: postText });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg my-4 ">
      <div className="px-4 py-6">
        <div className="flex items-center gap-1 mb-3">
          <div className="">
            <ProfileImage src={post.userImage} alt="avatar" />
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-start flex-col gap-1">
              <div className="">
                <ProfileNameHeading heading={post?.userName} />
              </div>
              <AgoMoment time={post.createdAt} />
            </div>
            <div className="">
              {auth && auth.id === post?.userId ? (
                <span className="cursor-pointer" tabIndex={0} role="button">
                  <PostOptions
                    menuClasses="w-full"
                    handleDelete={() => setDeleteModalOpen((prev) => !prev)}
                    handleEdit={() => setUpdateModal((prev) => !prev)}
                  >
                    <OptionsIcon />
                  </PostOptions>
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className={``}>
          <PrimaryText
            text={post?.text}
            customClasses={`text-lg font-normal capitalize`}
          />
          {post?.imageName ? (
            <div
              className="cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Image
                customClasses="h-[340px] w-[100%] object-cover shadow"
                src={post.imageName}
                alt={post.text ?? "Post"}
              />
            </div>
          ) : null}
        </div>
        {auth ? (
          <div className="my-3 flex gap-5 items-center">
            <div
              className="flex items-center mr-2 text-gray-700 text-lg cursor-pointer"
              onClick={() => setLiked((prev) => !prev)}
            >
              {!liked ? <LikeOutline /> : <LikeSolid />}
              {/* <span>12</span> */}
            </div>
            <div
              className="flex items-center mr-2 text-gray-700 text-lg cursor-pointer"
              onClick={() => setShowCommentBox((prev) => !prev)}
            >
              {!showCommentBox ? <CommentOutline /> : <CommentSolid />}

              {/* <span>{size(totalComment)}</span> */}
            </div>
            {/* <div className="flex items-center mr-2 text-gray-700 text-lg ">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>share</span>
          </div> */}
          </div>
        ) : null}
        {/* Comment section start here */}
        {auth ? (
          <>
            {showCommentBox ? (
              <div className="border-t-2 border-t-slate-200">
                <Comments id={post?._id} setTotalComment={setTotalComment} />
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <Modal
        open={{ isOpen, setIsOpen }}
        customPanelClasses="max-w-[80%]"
        title={post?.text ?? ""}
      >
        <Image
          customClasses="w-full"
          src={post?.imageName}
          alt={post?.text ?? "Post"}
        />
      </Modal>
      {/* Post delete modal */}
      <Modal
        open={{ isOpen: deleteModalOpen, setIsOpen: setDeleteModalOpen }}
        customPanelClasses="max-w-[500px] bg-white rounded-lg"
        title={"Delete Modal"}
        headerSection
      >
        <div className="py-5">
          <div className="mb-5">
            <Heading1
              customClasses="text-2xl"
              heading={`You want to delete this post?`}
            />
          </div>
          <div className="">
            {isLoading ? <SpinIcon /> : null}
            <MutateButton
              customClasses="justify-center mr-3 w-[100px] focus:ring-red-20 text-sm text-white font-medium hover:bg-red-800 text-white bg-red-700"
              title="Delete"
              handleMutate={handlePostDelete}
              disabled={isLoading}
            />

            <CloseButton
              title="Cancel"
              customClasses="justify-center w-[100px] focus:ring-blue-20 text-sm font-medium bg-blue-700 hover:bg-blue-800 text-white"
              handleClose={() => setDeleteModalOpen((prev) => !prev)}
              disabled={isLoading}
            />
          </div>
        </div>
      </Modal>
      {/* Post Update modal */}
      <Modal
        open={{ isOpen: updateModal, setIsOpen: setUpdateModal }}
        customPanelClasses="max-w-[500px] bg-white rounded-lg"
        title={"Update Post"}
        headerSection
      >
        <div className="py-5">
          <div className="mb-5">
            <Input
              customClasses=""
              name="post-text"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            />
          </div>
          <div className="">
            <MutateButton
              customClasses="disabled:bg-blue-200 justify-center mr-3 w-[100px] focus:ring-red-20 border text-sm text-black hover:text-white font-medium hover:bg-sky-800 text-white bg-white"
              title="Update"
              handleMutate={handleUpdatePost}
              disabled={updatePostLoading}
            />

            <CloseButton
              title="Cancel"
              customClasses="disabled:bg-blue-200 justify-center w-[100px] focus:ring-blue-20 text-sm font-medium bg-blue-700 hover:bg-blue-800 text-white"
              handleClose={() => setUpdateModal((prev) => !prev)}
              disabled={updatePostLoading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostCard;
