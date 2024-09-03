"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PostFormMessage from "./PostFormMessage";

const CreateArray = (length: number) => [...Array(length)];

function RecentMessage() {
  const path = usePathname();
  const [showMessage, setShowMessage] = useState(false);
  const [messageSlug, setMessageSlug] = useState("");

  const getMessageData = (messageSlug: string) => {
    setShowMessage(true);
    setMessageSlug(messageSlug);
  };

  return (
    <>
      {/* this is for desktop mode */}
      <div
        className={`hidden md:flex flex-col gap-0 overflow-auto max-h-[700px]`}
      >
        <Link
          href="/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
          className={`  ${
            path === "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
              ? "border-l-4 border-[var(--base-green)]"
              : ""
          }`}
        >
          <div
            className={`px-4 py-6 hover:bg-gray-200 dark:hover:bg-zinc-600 flex items-start gap-3 ${
              path === "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
                ? "bg-[#edf3f8]"
                : "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
            }`}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {"Ali Asghar".charAt(0)}
                {"Sedighian".charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm w-full flex items-start justify-between">
              <div>
                <p className="">Ali Asghar Sedighian</p>
                <p>You:2 خیلی ممنون ❤️</p>
              </div>
              <div>
                <p>Jul 24</p>
              </div>
            </div>
          </div>
        </Link>
        {CreateArray(10).map((n, i) => (
          <Link
            scroll={true}
            key={i}
            href={`/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`}
            className={` ${
              path ===
              `/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`
                ? "border-l-4 border-[var(--base-green)]"
                : ""
            }`}
          >
            <div
              className={`px-4 py-6 hover:bg-gray-200 dark:hover:bg-zinc-600 flex items-start gap-3 ${
                path ===
                `/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`
                  ? "bg-[#edf3f8]"
                  : "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
              }`}
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {"Ali Asghar".charAt(0)}
                  {"Sedighian".charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm w-full flex items-start justify-between">
                <div>
                  <p className="">Ali Asghar Sedighian</p>
                  <p>You: خیلی ممنون ❤️</p>
                </div>
                <div>
                  <p>Jul 24</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showMessage && (
        <div
          className={`flex md:hidden flex-col gap-0 overflow-auto max-h-[700px]`}
        >
          <Link
            onClick={() => getMessageData("user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL")}
            href="/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
            className={`  ${
              path === "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
                ? "border-l-4 border-[var(--base-green)]"
                : ""
            }`}
          >
            <div
              className={`px-4 py-6 hover:bg-gray-200 flex items-start gap-3 ${
                path === "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
                  ? "bg-[#edf3f8]"
                  : "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
              }`}
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {"Ali Asghar".charAt(0)}
                  {"Sedighian".charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm w-full flex items-start justify-between">
                <div>
                  <p className="">Ali Asghar Sedighian</p>
                  <p>You: خیلی ممنون ❤️</p>
                </div>
                <div>
                  <p>Jul 24</p>
                </div>
              </div>
            </div>
          </Link>
          {CreateArray(10).map((n, i) => (
            <Link
              onClick={() =>
                getMessageData(`user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`)
              }
              scroll={true}
              key={i}
              href={`/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`}
              className={` ${
                path ===
                `/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`
                  ? "border-l-4 border-[var(--base-green)]"
                  : ""
              }`}
            >
              <div
                className={`px-4 py-6 hover:bg-gray-200 flex items-start gap-3 ${
                  path ===
                  `/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnLindex${i}`
                    ? "bg-[#edf3f8]"
                    : "/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
                }`}
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {"Ali Asghar".charAt(0)}
                    {"Sedighian".charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm w-full flex items-start justify-between">
                  <div>
                    <p className="">Ali Asghar Sedighian</p>
                    <p>You: خیلی ممنون ❤️</p>
                  </div>
                  <div>
                    <p>Jul 24</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* this is for mobile mode */}
      {showMessage && (
        <div
          className={`flex-col flex md:hidden justify-between h-[calc(100vh-8rem)] ${
            showMessage ? "flex" : "hidden"
          }`}
        >
          {/* <div className="flex items-center gap-6 py-1 px-3 border-b">
            <div onClick={() => setShowMessage(false)}>
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
            </div>

            <div>
              <p className="font-bold">Ali Asghar Sedighian</p>
              <span className="text-[12px]">Active Now</span>
            </div>
          </div> */}
          <div className="px-3 border-b dark:border-[var(--dark-border)] flex-1 flex-grow h-full md:max-h-[500px] overflow-y-auto break-words w-screen">
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
            <p>body test{messageSlug}</p>
            <p>body test{messageSlug}</p> <p>body test{messageSlug}</p>{" "}
          </div>
          <PostFormMessage />
        </div>
      )}
    </>
  );
}

export default RecentMessage;
