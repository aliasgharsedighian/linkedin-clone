"use client";

import { useUser } from "@clerk/nextjs";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import createCommentAction from "@/actions/createCommentAction";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useTransition } from "react";

function CommentForm({ postId, userInfo }: { postId: string; userInfo: any }) {
  // const { user } = useUser();
  const ref = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();

  const createCommentActionWithPostId = createCommentAction.bind(null, postId);

  const handleCommentAction = async (formData: FormData): Promise<void> => {
    try {
      if (!userInfo?.userId) {
        throw new Error("User not authenticated");
      }

      const formDataCopy = formData;
      ref.current?.reset();
      // server action
      startTransition(async () => {
        const promise = createCommentActionWithPostId(formDataCopy);
        toast.promise(promise, {
          loading: "Creating comment...",
          success: "Comment created",
          error: "Failed to create comment",
        });
      });
    } catch (error) {
      console.error(`Error creating comment: ${error}`);
    }
  };

  return (
    <form
      ref={ref}
      action={(formData) => {
        const commentInput = formData.get("commentInput") as string;
        //Toast
        if (!commentInput.trim()) {
          toast.error("You must provide a comment input");
        } else {
          handleCommentAction(formData);
        }
      }}
      className="flex items-center space-x-1"
    >
      <Avatar>
        <AvatarImage src={userInfo?.imageUrl} />
        <AvatarFallback>
          {userInfo?.firstName?.charAt(0)}
          {userInfo?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="relative flex flex-1 bg-white border dark:border-[var(--dark-border)] rounded-3xl overflow-scroll resize-none w-full max-w-full no-scrollbar h-auto">
        <textarea
          name="commentInput"
          rows={1}
          placeholder="add a comment ..."
          className="outline-none flex-1 text-sm bg-transparent py-3 pl-4 pr-10 min-h-[43px] resize-y no-scrollbar h-auto dark:bg-[var(--dark-post-background)] dark:text-white"
          style={{ maxHeight: "150px" }}
        />
        <button
          className="absolute right-0 bottom-3"
          type="submit"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending ? (
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
  );
}

export default CommentForm;
