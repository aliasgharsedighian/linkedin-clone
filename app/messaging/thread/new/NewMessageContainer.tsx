"use client";

import React, { useEffect } from "react";
import PostFormMessage from "../PostFormMessage";
import { useAppStore } from "@/store/store";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NewMessageContainer({ userInfo }: any) {
  const { closeChat, selectedChatData } = useAppStore();
  //   useEffect(() => {
  //     console.log(selectedChatData);
  //   }, [selectedChatData]);
  return (
    <>
      <div className="sticky md:static top-[67px] flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b dark:border-[var(--dark-border)] bg-white dark:bg-zinc-800 z-10 rounded-t-md">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={selectedChatData.imageUrl} alt="profile-image" />
            <AvatarFallback>
              {selectedChatData.firstName.charAt(0)}
              {selectedChatData.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm w-full flex items-start justify-between">
            <p className="font-bold">{`${selectedChatData.firstName} ${selectedChatData.lastName}`}</p>
          </div>
        </div>
        <X
          onClick={() => closeChat()}
          className="h-4 text-gray-400 cursor-pointer"
        />
      </div>
      <div className="bg-gray-200/80 dark:bg-slate-800 flex flex-col gap-3 px-3 border-b dark:border-[var(--dark-border)] flex-1 overflow-auto py-3">
        conatiner
      </div>
      <PostFormMessage userInfo={userInfo} />
    </>
  );
}

export default NewMessageContainer;
