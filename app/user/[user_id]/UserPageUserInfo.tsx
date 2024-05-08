"use client";

import { Edit2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
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
import { revalidatePath } from "next/cache";

interface PageProps {
  firstName: string;
  lastName: string;
  id: any;
  headline: string;
  currentPosition: string;
  country: string;
  city: string;
  user_id: string;
  following: any;
  currentUserFollowing: any;
}

function UserPageUserInfo({
  firstName,
  lastName,
  id,
  headline,
  currentPosition,
  country,
  city,
  user_id,
  following,
  currentUserFollowing,
}: PageProps) {
  const [followedUser, setFollowedUser] = useState(false);

  useEffect(() => {
    if (currentUserFollowing?.find((item: any) => item.userId === user_id)) {
      setFollowedUser(true);
    } else {
      setFollowedUser(false);
    }
  }, []);

  const handleFollowUser = async () => {
    const promise = await fetch(
      `/api/users/${id}/${followedUser ? "unfollow" : "follow"}`,
      {
        method: "POST",
        body: JSON.stringify({
          id: user_id,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await promise.json();
    console.log(data);
    if (promise.ok) {
      if (data.type === "follow") {
        setFollowedUser(true);
      }
      if (data.type === "unfollow") {
        setFollowedUser(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-6">
      <div className="flex justify-end">
        <SignedIn>
          <Button
            onClick={() => handleFollowUser()}
            variant="ghost"
            className="text-sm text-white bg-sky-600 hover:bg-sky-700 hover:text-white"
          >
            {followedUser ? "Following" : "Follow"}
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

      <div className="mt-4">
        <p className="text-xl font-bold">
          {firstName} {lastName}
        </p>
        <p>{headline}</p>
      </div>
      <p className="text-sm text-gray-500">
        {currentPosition} {"Islamic Azad University"}
      </p>
      {country ||
        (city && (
          <p className="text-sm text-gray-500">
            {city},{country}
          </p>
        ))}
      <Dialog>
        <DialogTrigger className="flex flex-end">
          <p className="text-sm text-sky-600">
            {following?.length ? following.length : "0"} connections
          </p>
        </DialogTrigger>
        <DialogContent className="mx-0 px-0">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-start mx-4">Conncetions</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {following ? (
              following.map((follow: any) => (
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
                    <p className="font-semibold">
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
              <p className="mx-4">user haven't any connections</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserPageUserInfo;
