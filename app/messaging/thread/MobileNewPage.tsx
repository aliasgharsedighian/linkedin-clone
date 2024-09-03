import { Input } from "@/components/ui/input";
import React from "react";
import SuggestedFriends from "./new/SuggestedFriends";

function MobileNewPage({ userInfo }: any) {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-8.5rem)]">
      <div className="py-2 px-3 border-b dark:border-[var(--dark-border)]">
        <p className="font-bold">New Message</p>
      </div>
      <div className="py-1 px-3 border-b dark:border-[var(--dark-border)]">
        <Input
          className="py-1 px-3 h-auto rounded-full"
          placeholder="type a name or multiple names"
        />
      </div>

      <SuggestedFriends userInfo={userInfo} />
    </div>
  );
}

export default MobileNewPage;
