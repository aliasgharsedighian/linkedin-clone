"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import { LikeCommentRequestBody } from "@/app/api/posts/[post_id]/comments/[comments_id]/like/route";
import { IPostDocument } from "@/mongodb/models/Post";
import { ThumbsUpIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import deleteCommentAction from "@/actions/deleteCommentAction";

function Comment({ post, comment }: { post: IPostDocument; comment: any }) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const isAuthor = user?.id === post.user?.userId;

  useEffect(() => {
    if (user?.id && comment?.likes?.find((i: any) => i.userId === user?.id)) {
      setLiked(true);
    }
  }, [comment, user]);

  const likeOrUnlikeComment = async (commentId: string) => {
    if (!user?.id) {
      setTimeout(() => {
        toast.error("You must sign in");
      }, 500);
      throw new Error("User not authenticated");
    }

    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like: any) => like !== user.id)
      : [...(likes ?? []), user.id];

    const body: LikeCommentRequestBody | UnlikePostRequestBody = {
      userId: {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user?.lastName || "",
      },
      commentId: commentId,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const response = await fetch(
      `/api/posts/${post._id}/comments/${commentId}/${
        liked ? "unlike" : "like"
      }`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like or unlike Comment");
    }

    const fetchLikesResponse = await fetch(
      `/api/posts/${post._id}/comments/${commentId}/like`
    );
    // console.log(await fetchLikesResponse.json());
    if (!fetchLikesResponse.ok) {
      setLiked(originalLiked);
      setLikes(originalLikes);

      throw new Error("Failed to fetch likes");
    }

    const newLikedData = await fetchLikesResponse.json();
    setLikes(newLikedData);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      startTransition(async () => {
        const promise = deleteCommentAction(commentId);
        toast.promise(promise, {
          loading: "Deleting Comment...",
          success: "Comment deleted",
          error: "Failed to delete Comment",
        });
      });
    } catch (error) {
      console.log("Error Deleting comment:", error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex gap-1 ${
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
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-400">
                <ReactTimeago date={new Date(comment.createdAt)} />
              </p>
              {comment.user.userId === user?.id &&
                (isPending ? (
                  <div className="flex justify-end mr-1" role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className="flex justify-end cursor-pointer"
                          onClick={() => {
                            handleDeleteComment(comment._id);
                          }}
                        >
                          <Trash2 size={14} className="hover:text-blue-400" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Delete the Comment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </div>
          </div>
          <p className="mt-3 text-sm">{comment.text}</p>
        </div>
      </div>
      <div className={`flex gap-2 items-center`}>
        <Button
          onClick={() => {
            const promise = likeOrUnlikeComment(comment._id);

            toast.promise(promise, {
              loading: "Liking Comment...",
              success: "Comment liked",
              error: "Failed to like comment",
            });
          }}
          className={`w-fit text-xs ${liked && "bg-sky-100 font-semibold"}`}
          variant="ghost"
        >
          Like
        </Button>
        <div className="flex gap-1">
          <ThumbsUpIcon
            className={cn(
              "mr-1 w-4 md:w-4",
              liked && "text-[#4881c2] fill-[#4881c2]"
            )}
          />
          <Dialog>
            <DialogTrigger>
              {likes && likes.length > 0 && (
                <span className="text-xs cursor-pointer hover:underline hover:text-[#4881c2]">
                  {likes.length}
                </span>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-start">Likes</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {likes
                  ?.filter((like: any) => like.userId === user?.id)
                  .map((like: any) => (
                    <div
                      key={like}
                      className="flex items-center gap-2 border-b pb-2"
                    >
                      <Avatar>
                        <AvatarImage src={like.userImage} />
                        <AvatarFallback>
                          {like.firstName?.charAt(0)}
                          {like?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {like.firstName} {like?.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          @{like?.firstName}
                          {like?.firstName}-{like?.userId?.toString().slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
                {likes
                  ?.filter((like: any) => like.userId !== user?.id)
                  .map((like: any) => (
                    <div key={like} className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={like.userImage} />
                        <AvatarFallback>
                          {like.firstName?.charAt(0)}
                          {like?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {like.firstName} {like?.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          @{like?.firstName}
                          {like?.firstName}-{like?.userId?.toString().slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Comment;
