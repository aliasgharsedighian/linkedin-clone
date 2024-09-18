"use client";

import React from "react";
import SuggestedFriends from "./new/SuggestedFriends";
import { useAppStore } from "@/store/store";
import SearchContacts from "./new/SearchContacts";
import NewMessageContainer from "./new/NewMessageContainer";

function MobileNewPage({ userInfo, userId }: any) {
  const { selectedChatType } = useAppStore();
  return (
    <div className="flex md:hidden flex-col justify-between h-[calc(100vh-7.5rem)]">
      {/* <div className="py-2 px-3 border-b dark:border-[var(--dark-border)]">
        <p className="font-bold">New Message</p>
      </div> */}
      {selectedChatType === undefined ? (
        <>
          <SearchContacts userId={userId} />
          <SuggestedFriends userInfo={userInfo} />
        </>
      ) : (
        <NewMessageContainer />
      )}
    </div>
  );
}

export default MobileNewPage;
