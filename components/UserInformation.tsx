"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { IPostDocument } from "@/mongodb/models/Post";
import MobileUserInformationExpand from "./MobileUserInformationExpand";
import Link from "next/link";
import { IUsers } from "@/mongodb/models/users";
import { useAppStore } from "@/store/store";
import useUserInfo from "@/hooks/useUserInfo";
import { useEffect } from "react";
import { SignedOutProvider } from "@/app/SignedOutProvider";
import { SignedInProvider } from "@/app/SignedInProvider";
import SignInButton from "./SignInButton";

function UserInformation({
  posts,
}: // user,
{
  posts: IPostDocument[];
  // user: any;
}) {
  const { userInfo } = useAppStore();

  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;
  const imageUrl = userInfo?.imageUrl;

  const userPosts = posts?.filter(
    (post) => post.user.userId === userInfo?.userId
  );
  const userComments = posts.flatMap((post) =>
    post?.comments?.filter(
      (comment) => comment.user.userId === userInfo?.userId
    )
  );

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[var(--dark-post-background)] rounded-lg border dark:border-[var(--dark-border)] py-4">
      <Link
        className="flex flex-col justify-center items-center"
        href="/profile"
      >
        <Avatar>
          {userInfo?.userId ? (
            <AvatarImage src={imageUrl} />
          ) : (
            <AvatarImage
              alt="profile-pic"
              src="https://github.com/shadcn.png"
            />
          )}

          <AvatarFallback>
            {firstName?.charAt(0)} {lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* <SignedIn> */}
        <SignedInProvider>
          <div className="text-center dark:text-white">
            <p className="font-semibold">
              {firstName} {lastName}
            </p>

            <p className="text-xs">
              @{firstName}
              {lastName}-{userInfo?.userId.slice(-4)}
            </p>
          </div>
        </SignedInProvider>
        {/* </SignedIn> */}
      </Link>

      {/* <SignedOut> */}
      <SignedOutProvider>
        <div className="text-center space-y-2">
          <p className="dark:text-white">You are not signed in</p>
          <Button asChild className="bg-[#0b63c4] text-white">
            <SignInButton variant="default" />
          </Button>
        </div>
      </SignedOutProvider>
      {/* </SignedOut> */}
      {/* <SignedIn> */}
      <SignedInProvider>
        <div className="w-full hidden md:flex flex-col">
          <hr className="w-full border-gray-200 my-5 dark:border-[var(--dark-border)]" />

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Posts</p>
            <p className="text-blue-400">{userPosts.length}</p>
          </div>

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Comments</p>
            <p className="text-blue-400">{userComments.length}</p>
          </div>
        </div>
        <MobileUserInformationExpand
          userPosts={userPosts}
          userComments={userComments}
        />
      </SignedInProvider>
      {/* </SignedIn> */}
    </div>
  );
}

export default UserInformation;
