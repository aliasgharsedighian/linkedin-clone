"use client";

import { IPostDocument } from "@/mongodb/models/Post";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReactTimeago from "react-timeago";

function CommentFeed({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const isAuthor = user?.id === post.user?.userId;

  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <div
          key={comment._id}
          className={`flex space-x-1 ${
            comment.user.userId === user?.id
              ? "flex-row-reverse"
              : "flex-row justify-start"
          }`}
        >
          <Avatar>
            <AvatarImage src={comment.user?.userImage} />
            <AvatarFallback>
              {comment.user?.firstName?.charAt(0)}
              {comment.user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div
            className={`px-4 py-2 rounded-md w-full sm:w-auto md:min-w-[300px] ${
              comment.user.userId === user?.id ? "bg-sky-100" : "bg-slate-100"
            }`}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {comment.user.firstName} {comment.user?.lastName}{" "}
                </p>
                <p className="text-xs text-gray-400">
                  @{comment.user.firstName}
                  {comment.user.firstName}-
                  {comment.user.userId.toString().slice(-4)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  <ReactTimeago date={new Date(comment.createdAt)} />
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentFeed;
