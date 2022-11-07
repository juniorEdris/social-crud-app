import React from "react";
import {
  AgoMoment,
  LikeOutline,
  PrimaryText,
  ProfileImage,
  ProfileNameHeading,
} from "../AtomicDesign/Atoms";

const CommentCard = ({ comments = [] }) => {
  return (
    <div className="">
      {comments?.map((comment) => (
        <div className="flex items-center gap-1 my-2" key={comment?.id}>
          <div className="">
            <ProfileImage
              src={`${comment?.userImage}`}
              alt={comment?.userName}
              customClasses="w-9 h-9"
            />
          </div>
          <div className="flex items-start flex-col flex-1">
            <div>
              <div className="">
                <ProfileNameHeading heading={comment?.userName} />
              </div>
            </div>
            <div className="w-full">
              <div className="py-1 px-2 bg-slate-200 rounded-lg block">
                <PrimaryText
                  text={comment?.comment}
                  customClasses={`my-1 text-normal mx-2`}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="cursor-pointer">
                  <LikeOutline customClasses="w-4 h-4" />
                </span>
                <span className="">
                  <AgoMoment time={comment?.createdAt} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
