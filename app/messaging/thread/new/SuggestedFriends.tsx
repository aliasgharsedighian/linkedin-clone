"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PostFormMessage from "../PostFormMessage";

interface PageProps {
  userInfo: any;
}

function SuggestedFriends({ userInfo }: PageProps) {
  return (
    <>
      <div className="px-3 border-b dark:border-[var(--dark-border)] flex-1 h-full overflow-auto">
        <div className="flex flex-col gap-4 py-3">
          {userInfo.following ? (
            userInfo.following.map((follow: any) => (
              <Button
                key={follow.userId}
                variant="ghost"
                className="flex items-center justify-start gap-2 mx-4 px-0"
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
                    @{follow?.firstName}
                    {follow?.firstName}-{follow?.userId?.toString().slice(-4)}
                  </p>
                </div>
              </Button>
            ))
          ) : (
            <p className="mx-4 dark:text-white">you have not any connections</p>
          )}
        </div>
      </div>
      <PostFormMessage />
    </>
  );
}

export default SuggestedFriends;
