"use client";

import { IPostDocument } from "@/mongodb/models/Post";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { Edit2Icon, Send, Trash2 } from "lucide-react";
import deletePostAction from "@/actions/deletePostAction";
import Image from "next/image";
import PostOptions from "./PostOptions";
import { toast } from "sonner";
import { useTransition } from "react";
import editPostAction from "@/actions/editPostAction";
import Link from "next/link";

function Post({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const [isPending, startTransition] = useTransition();
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [edit, setEdit] = useState(false);

  const isAuthor = user?.id === post.user?.userId;

  const handleDeletePostAction = async (postId: string) => {
    try {
      startTransition(async () => {
        const promise = deletePostAction(postId);
        toast.promise(promise, {
          loading: "Deleting post...",
          success: "Post deleted",
          error: "Failed to delete post",
        });
      });
    } catch (error) {
      console.log("Error Deleting post:", error);
    }
  };

  const handleUpdatePostAction = async (postId: string, editText: string) => {
    try {
      startTransitionEdit(async () => {
        const promise = editPostAction(postId, editText);
        toast.promise(promise, {
          loading: "Updating post...",
          success: "Post updated",
          error: "Failed to update post",
        });
        setEdit(false);
      });
    } catch (error) {
      console.log("Error Deleting post:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-[var(--dark-post-background)] rounded-md border dark:border-[var(--dark-border)]">
      <div className="p-4 flex space-x-2">
        <Link
          href={
            post.user.userId === user?.id
              ? "/profile"
              : `/user/${post.user.userId}`
          }
        >
          <Avatar>
            <AvatarImage src={post.user?.userImage} />
            <AvatarFallback>
              {post.user?.firstName?.charAt(0)}
              {post.user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex justify-between flex-1">
          <div>
            <p className="font-semibold dark:text-white">
              {post.user?.firstName} {post.user?.lastName}{" "}
              {isAuthor && (
                <Badge className="ml-2" variant="secondary">
                  Author
                </Badge>
              )}
            </p>
            <p className="text-xs text-gray-400">
              @{post.user?.firstName}
              {post.user?.firstName}-{post.user?.userId.toString().slice(-4)}
            </p>
            <p className="text-xs text-gray-400">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>

          {isAuthor && (
            <div className="flex items-start gap-2">
              <Button
                variant={edit ? "default" : "ghost"}
                className="px-3 py-2 dark:text-white dark:hover:bg-gray-600"
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                <Edit2Icon size={16} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="px-3 py-2"
                    variant="outline"
                    disabled={isPending}
                    aria-disabled={isPending}
                  >
                    {isPending ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      <Trash2 size={16} />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-start">
                      Delete post
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-start">
                      This action cannot be undone. This will permanently delete
                      your post
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row justify-end items-center gap-5">
                    <AlertDialogCancel className="mt-0">
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDeletePostAction(post._id);
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>

      <div>
        {edit ? (
          <form
            action={(formData) => {
              const editInput = formData.get("editInput") as string;
              if (!editInput.trim()) {
                toast.error("You must provide a post input");
              } else {
                handleUpdatePostAction(post._id, editInput);
              }
            }}
          >
            <div className="relative flex flex-1 bg-white border dark:border-[var(--dark-border)] rounded-3xl overflow-scroll resize-none w-full max-w-full no-scrollbar h-auto mb-3">
              <textarea
                className="outline-none flex-1 text-sm bg-transparent py-3 pl-4 pr-10 min-h-[43px] resize-y no-scrollbar h-auto dark:bg-[var(--dark-post-background)] dark:text-white"
                rows={1}
                defaultValue={post.text}
                name="editInput"
                placeholder="Edit your text..."
                style={{ maxHeight: "150px" }}
              />
              <button
                className="absolute right-0 bottom-3"
                type="submit"
                aria-disabled={isPendingEdit}
                disabled={isPendingEdit}
              >
                {isPendingEdit ? (
                  <div className="mr-2" role="status">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                  <Send size={20} className="mr-2" color="#4881c2" />
                )}
              </button>
            </div>
          </form>
        ) : (
          <p className="px-4 pb-2 mt-2 whitespace-break-spaces dark:text-white">
            {post.text}
          </p>
        )}
        {/* If image uploaded put it here ... */}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post Image"
            width={500}
            height={500}
            className="w-full mx-auto"
          />
        )}
      </div>
      <PostOptions post={post} />
    </div>
  );
}

export default Post;
