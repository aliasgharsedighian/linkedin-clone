"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ImageIcon, Send, XIcon } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
// import createPostAction from "@/actions/createPostActions";
import { toast } from "sonner";
import { useAppStore } from "@/store/store";
import createPostAction from "@/actions/serverRequest/createPostAction";
import PostFormImages from "./PostFormImages";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function PostForm({
  token,
  revalidateData,
}: {
  token: any;
  revalidateData: any;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { userInfo } = useAppStore();

  const [isPending, startTransition] = useTransition();

  // const [preview, setPreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<any>([]);

  // const [profileImageFile, setProfileImageFile] = useState<any>();
  const [postImageFiles, setPostImageFiles] = useState<any>([]);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  useEffect(() => {
    if (previews.length > 5) {
      toast.error("Maximum file is 5!");
      setPreviews(previews.slice(0, 5));
      setPostImageFiles(postImageFiles.slice(0, 5));
    }
  }, [previews]);

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text.trim()) {
      setTimeout(() => {
        toast.error("You must provide a post input");
      }, 500);
      // throw new Error("You must provide a post input");
      return;
    }
    // setPreview(null);
    setPreviews([]);

    try {
      startTransition(async () => {
        //this is for use "use server" in next js
        // const promise = createPostAction(formDataCopy);
        const promise = createPostAction(
          text,
          postImageFiles,
          token,
          revalidateData,
          setProgress
        );

        //Toast notfication based on the promise above
        toast.promise(promise, {
          loading: "Creating post...",
          success: "Post created",
          error: "Failed to create post",
        });
      });
    } catch (error) {
      console.log("Error Creating post:", error);
    }
  };

  const handleImageChange = (e: any) => {
    e.preventDefault();
    const uploadFiles = e.target.files;
    const previewFiles = e.target?.files;

    let previewArray = [];
    let fileArray = [];

    if (previews.length !== 0) {
      for (let j = 0; j < previews.length; j++) {
        previewArray.push(previews[j]);
        fileArray.push(postImageFiles[j]);
      }
    }

    if (uploadFiles.length > 5) {
      toast.error("You cannot choose more than 5 items");
    }
    if (uploadFiles.length > 0 && uploadFiles.length <= 5) {
      for (let i = 0; i < uploadFiles.length; i++) {
        previewArray.push(URL.createObjectURL(previewFiles[i]));
        fileArray.push(uploadFiles[i]);

        if (previewFiles[i].size >= 5000000) {
          toast.error("Max file 5Mb");
          return;
        } else if (
          previewFiles[i].type === "image/jpeg" ||
          previewFiles[i].type === "image/png" ||
          previewFiles[i].type === "image/webp"
        ) {
        } else {
          toast.error("File format error");
        }
      }
    }
    setPreviews(previewArray);
    // setPostImageFiles(uploadFiles);
    setPostImageFiles(fileArray);
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          //handle form submission with server action
          handlePostAction(formData);
        }}
        className="p-3 bg-white dark:bg-[var(--dark-post-background)] rounded-lg border dark:border-[var(--dark-border)]"
      >
        <div className="flex items-center space-x-2">
          {user ? (
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage src={userInfo?.imageUrl} />
              <AvatarFallback>
                {userInfo?.firstName?.charAt(0)}
                {userInfo?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="relative flex flex-1 bg-white border dark:border-[var(--dark-border)] rounded-3xl overflow-scroll resize-none w-full max-w-full no-scrollbar h-auto">
            <textarea
              name="postInput"
              rows={1}
              placeholder="Start writing a post ..."
              className="outline-none flex-1 text-sm bg-transparent py-3 pl-4 pr-10 min-h-[43px] resize-y no-scrollbar h-auto dark:bg-[var(--dark-post-background)] dark:text-white"
              style={{ maxHeight: "150px" }}
            />
            <input
              ref={fileInputRef}
              type="file"
              name="posts-image"
              accept="image/*"
              multiple={true}
              hidden
              onChange={handleImageChange}
            />

            <button
              className="absolute right-0 bottom-3"
              type="submit"
              aria-disabled={isPending}
              disabled={isPending || progress.pc !== 0}
            >
              {isPending ? (
                <div className="mr-4" role="status">
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
                <Send size={20} className="mr-4" color="#4881c2" />
              )}
            </button>
          </div>
        </div>
        {/* Preview conditional check */}
        {previews?.length !== 0 && <PostFormImages images={previews} />}

        <div className="flex justify-end items-center mt-2 space-x-2 relative">
          {progress.started && (
            <CircularProgressbar
              value={progress.pc}
              text={`${progress.pc.toFixed()}%`}
              className="w-12 h-12 absolute bottom-1 right-auto font-bold"
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "20px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(62, 152, 199, ${progress.pc / 100})`,
                textColor: "var(--linkedin-blue)",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          )}
          <Button
            className={`dark:bg-[var(--dark-post-background)] dark:text-white dark:border-[var(--dark-border)] ${
              progress.started ? "mt-4" : ""
            }`}
            type="button"
            variant={previews?.length !== 0 ? "secondary" : "outline"}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {previews?.length !== 0 ? "Add" : "Upload"} images
          </Button>

          {/* Add a remove Privew button */}

          {previews?.length !== 0 && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setPostImageFiles([]);
                setPreviews([]);
              }}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove image
            </Button>
          )}
        </div>
      </form>
      <hr className="mt-2 border-gray-300 dark:border-[var(--dark-border)]" />
      {/* {progress.started && <progress max={100} value={progress.pc}></progress>} */}
    </div>
  );
}

export default PostForm;
