"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";

function PostFormMessage() {
  const path = usePathname();
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const onEmojiClick = (emojiObject: any) => {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
    setEmojiOpen(false);
  };

  return (
    <form className="fixed md:static bottom-0 w-full bg-white z-10" action="">
      <div className="py-2 px-3 border-b flex gap-2 items-start">
        <Textarea
          className="resize-none"
          rows={3}
          placeholder="Write a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="button" className="p-0 h-auto" variant="ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </Button>
      </div>
      <div className="py-2 px-3 w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button type="button" className="p-0 h-auto" variant="ghost">
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Button>
          <Button type="button" className="p-0 h-auto" variant="ghost">
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
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
          </Button>
          <Popover
            open={emojiOpen}
            onOpenChange={() => setEmojiOpen(!emojiOpen)}
          >
            <PopoverTrigger>
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
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              <div className="w-[450px] h-[350px]">
                <EmojiPicker
                  className="!absolute"
                  lazyLoadEmojis={false}
                  searchDisabled={true}
                  skinTonesDisabled={true}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 h-auto rounded-3xl text-[12px]"
          variant="ghost"
          disabled={
            path === "/messaging/thread/new"
              ? friends.length === 0 || !message
              : !message
          }
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default PostFormMessage;
