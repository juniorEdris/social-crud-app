import moment from "moment/moment";
import { placeHolderImage } from "../utils/etc";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg my-4 ">
      <div className="px-4 py-6">
        <div className="flex items-start gap-1">
          {!post?.userImage ? (
            <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src={placeHolderImage}
              alt="avatar"
            />
          ) : (
            <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src={post.userImage}
              alt="avatar"
            />
          )}
          <div className="flex items-start flex-col gap-1">
            <div className="">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {post?.userName}{" "}
              </h2>
            </div>
            <small className="text-sm text-gray-700">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
        </div>
        <div
          className={`w-[470px] mx-auto ${post.imageName ? "h-[340px]" : ""}`}
        >
          <p className="mt-3 text-gray-700 text-base">{post?.text}</p>
          {post?.imageName ? (
            <div className="">
              <img
                className="h-[340px] w-[470px] object-cover shadow" //  h-12 rounded-full  mr-4
                src={`/images/${post.imageName}`}
                alt={post.text}
              />
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex gap-5 items-center">
          <div className="flex items-center mr-2 text-gray-700 text-lg ">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>12</span>
          </div>
          <div className="flex items-center mr-2 text-gray-700 text-lg ">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>8</span>
          </div>
          <div className="flex items-center mr-2 text-gray-700 text-lg ">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
