import { useState } from "react";
import {
  AgoMoment,
  CommentOutline,
  CommentSolid,
  Image,
  LikeOutline,
  LikeSolid,
  PrimaryText,
  ProfileImage,
  ProfileNameHeading,
} from "../AtomicDesign/Atoms";
import Modal from "../AtomicDesign/Template/Modal";
import Comments from "../Comments";

const PostCard = ({ post }) => {
  const user = localStorage.getItem("user");
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  return (
    <div className="bg-white shadow-lg rounded-lg my-4 ">
      <div className="px-4 py-6">
        <div className="flex items-start gap-1 mb-3">
          <div className="">
            <ProfileImage src={post.userImage} alt="avatar" />
          </div>
          <div className="flex items-start flex-col gap-1">
            <div className="">
              <ProfileNameHeading heading={post?.userName} />
            </div>
            <AgoMoment time={post.createdAt} />
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
        {user ? (
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
        {user ? (
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
    </div>
  );
};

export default PostCard;
