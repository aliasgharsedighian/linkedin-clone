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
import { useAuth } from "@clerk/nextjs";
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
              {comment.user.userId === user?.id && (
                <div
                  className="flex justify-end cursor-pointer"
                  onClick={() => {
                    handleDeleteComment(comment._id);
                  }}
                >
                  <Trash2 size={14} className="hover:text-blue-400" />
                </div>
              )}
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
                {likes?.map((like: any) => (
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
