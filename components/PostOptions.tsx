"use client";

import { IPostDocument } from "@/mongodb/models/Post";
// import { SignedIn, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LikePostRequestBody } from "@/app/api/posts/[post_id]/like/route";
import { UnlikePostRequestBody } from "@/app/api/posts/[post_id]/unlike/route";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import { toast } from "sonner";
import { SignedInProvider } from "@/app/SignedInProvider";
import { LIKE_UNLIKE_ROUTE } from "@/utils/constants";

function PostOptions({
  post,
  userInfo,
  revalidateData,
  token,
}: {
  post: IPostDocument;
  userInfo: any;
  revalidateData: any;
  token: any;
}) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  // const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if (userInfo?.userId && post.likes?.includes(userInfo.userId)) {
      setLiked(true);
    }
  }, [post, userInfo]);

  const likeOrUnlikePost = async () => {
    const originalLiked = liked;
    const originalLikes = likes;

    const newLikes = liked
      ? likes?.filter((like) => like !== userInfo.userId)
      : [...(likes ?? []), userInfo.userId];

    const body: LikePostRequestBody | UnlikePostRequestBody = {
      userId: userInfo.userId,
    };

    setLiked(!liked);
    setLikes(newLikes);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append(`postId`, post._id);
    const response = await fetch(LIKE_UNLIKE_ROUTE, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    });
    const res = await response.json();
    if (res.status === 200) {
      setLiked(!liked);
      revalidateData();
    }
    if (res.status !== 200) {
      setLiked(originalLiked);
      setLikes(originalLikes);
      throw new Error("Failed to like or unlike post");
    }

    // const fetchLikesResponse = await fetch(`/api/posts/${post._id}/like`);
    // if (!fetchLikesResponse.ok) {
    //   setLiked(originalLiked);
    //   setLikes(originalLikes);

    //   throw new Error("Failed to fetch likes");
    // }

    // const newLikedData = await fetchLikesResponse.json();
    // setLikes(newLikedData);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <div>
          {likes && likes.length > 0 && (
            <p className="text-xs text-gray-500 cursor-pointer hover:underline">
              {likes.length} likes
            </p>
          )}
        </div>
        <div>
          {post?.comments && post.comments.length > 0 && (
            <p
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="text-xs text-gray-500 cursor-pointer hover:underline"
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>

      <div className="flex p-2 justify-between border-t dark:border-[var(--dark-border)]">
        <Button
          variant="ghost"
          className="postButton px-2 md:px-4 py-1 md:py-2 dark:text-white dark:hover:bg-gray-600"
          onClick={() => {
            const promise = likeOrUnlikePost();

            toast.promise(promise, {
              loading: `${liked ? "Unliking" : "Liking"} post...`,
              success: `Post ${liked ? "Unliked" : "Liked"}`,
              error: "Failed to like post",
            });
          }}
        >
          {/* If user has liked the post, show filled thumbs up icon */}
          <ThumbsUpIcon
            className={cn(
              "mr-1 w-4 md:w-6",
              liked && "text-[#4881c2] fill-[#4881c2]"
            )}
          />
          Like
        </Button>

        <Button
          variant="ghost"
          className="postButton px-2 md:px-4 py-1 md:py-2 dark:text-white dark:hover:bg-gray-600"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <MessageCircle
            className={cn(
              "mr-1 w-4 md:w-6",
              isCommentsOpen && "text-gray-600 fill-gray-600"
            )}
          />
          Comment
        </Button>

        <Button
          variant="ghost"
          className="postButton px-2 md:px-4 py-1 md:py-2 dark:text-white dark:hover:bg-gray-600"
        >
          <Repeat2 className="mr-1 w-4 md:w-6" />
          Repost
        </Button>

        <Button
          variant="ghost"
          className="postButton px-2 md:px-4 py-1 md:py-2 dark:text-white dark:hover:bg-gray-600"
        >
          <Send className="mr-1 w-4 md:w-6" />
          Send
        </Button>
      </div>

      {isCommentsOpen && (
        <div className="p-4">
          <SignedInProvider>
            <CommentForm
              postId={post._id}
              userInfo={userInfo}
              revalidateData={revalidateData}
              token={token}
            />
          </SignedInProvider>

          <CommentFeed post={post} />
        </div>
      )}
    </div>
  );
}

export default PostOptions;
