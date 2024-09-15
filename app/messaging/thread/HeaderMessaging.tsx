"use client";

import { SearchIcon } from "lucide-react";
import React from "react";
import HeadMessagingButton from "./HeadMessagingButton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";

function HeaderMessaging() {
  const { showMessage, setShowMessage } = useAppStore();

  return (
    <div className="sticky md:static top-[67px] flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b dark:border-[var(--dark-border)] bg-white dark:bg-zinc-800 z-10 rounded-t-md">
      <div className="flex items-center gap-4">
        {showMessage && (
          <Button
            onClick={() => setShowMessage(false)}
            variant="ghost"
            className="p-0 m-0 flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </Button>
        )}

        <p className="font-bold">Messaging</p>
        <form className="hidden sm:flex items-center space-x-1 bg-[#edf3f8] dark:bg-[var(--dark-post-background)] dark:border dark:border-[var(--dark-border)] px-2 py-1 rounded-sm">
          <SearchIcon className="h-4 text-gray-400" />
          <input
            type="text"
            name="search-message"
            id="search-message"
            placeholder="search messages"
            className="bg-transparent flex-1 outline-none dark:bg-[var(--dark-post-background)] dark:text-white placeholder:text-sm"
          />
        </form>
      </div>
      <HeadMessagingButton setShowMessage={setShowMessage} />
    </div>
  );
}

export default HeaderMessaging;
