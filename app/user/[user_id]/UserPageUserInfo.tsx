"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";

interface PageProps {
  userInfo: any;
  currentUserFollowing: any;
}

function UserPageUserInfo({ userInfo, currentUserFollowing }: PageProps) {
  const { user } = useUser();
  const [followedUser, setFollowedUser] = useState("loading");

  useEffect(() => {
    if (
      currentUserFollowing?.find(
        (item: any) => item.userId === userInfo?.userId
      )
    ) {
      setFollowedUser("following");
    } else {
      setFollowedUser("follow");
    }
  }, [currentUserFollowing, user]);

  const handleFollowUser = async () => {
    const orginalFollowed = followedUser;

    if (followedUser === "follow") {
      setFollowedUser("following");
    }
    if (followedUser === "following") {
      setFollowedUser("follow");
    }

    const promise = await fetch(
      `/api/users/${userInfo._id}/${
        followedUser === "following" ? "unfollow" : "follow"
      }`,
      {
        method: "POST",
        body: JSON.stringify({
          id: userInfo.userId,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await promise.json();

    if (!promise.ok) {
      setFollowedUser(orginalFollowed);
      throw new Error("Failed to follow or unfollow user");
    }
    location.reload();
  };

  return (
    <div className="flex flex-col gap-2 mx-6">
      <div className="flex justify-end">
        <SignedIn>
          <Button
            onClick={() => {
              const promise = handleFollowUser();

              toast.promise(promise, {
                loading: "Follow/Unfollow user...",
                success: "User Followed/Unfollowed",
                error: "Failed to follow user",
              });
            }}
            variant="ghost"
            className="text-sm text-white bg-sky-600 hover:bg-sky-700 hover:text-white"
          >
            {followedUser === "loading"
              ? "Loading ..."
              : followedUser === "following"
              ? "Following"
              : "Follow"}
          </Button>
        </SignedIn>

        <SignedOut>
          <div className="text-center space-y-2">
            <Button asChild className="bg-[#0b63c4] text-white">
              <SignInButton>Sign in</SignInButton>
            </Button>
          </div>
        </SignedOut>
      </div>

      <div className="mt-4 dark:text-white">
        <p className="text-xl font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <p>{userInfo?.extendData?.headline}</p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {userInfo?.extendData?.currentPosition} {"Islamic Azad University"}
      </p>
      {userInfo?.extendData?.country && userInfo?.extendData?.city && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {userInfo?.extendData?.city},{userInfo?.extendData?.country}
        </p>
      )}
      <Dialog>
        <DialogTrigger className="flex flex-end">
          <p className="text-sm text-sky-600">
            {userInfo?.following?.length ? userInfo?.following.length : "0"}{" "}
            connections
          </p>
        </DialogTrigger>
        <DialogContent className="mx-0 px-0 dark:bg-[var(--dark-post-background)] dark:border-[var(--dark-border)]">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-start mx-4 dark:text-white">
              Conncetions
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {userInfo?.following ? (
              userInfo?.following.map((follow: any) => (
                <Link
                  href={`/user/${follow?.userId}`}
                  key={follow.userId}
                  className="flex items-center gap-2 mx-4"
                >
                  <Avatar>
                    <AvatarImage src={follow?.imageUrl} />
                    <AvatarFallback>
                      {follow?.firstName?.charAt(0)}
                      {follow?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-white">
                      {follow.firstName} {follow?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      <p className="text-xs text-gray-400">
                        @{follow?.firstName}
                        {follow?.firstName}-
                        {follow?.userId?.toString().slice(-4)}
                      </p>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="mx-4 dark:text-white">
                user have not any connections
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserPageUserInfo;
