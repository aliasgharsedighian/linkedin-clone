"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PostFormMessage from "./PostFormMessage";
import MobileMessageId from "./MobileMessageId";
import MobileNewPage from "./MobileNewPage";

const CreateArray = (length: number) => [...Array(length)];

function RecentMessage({ userInfo }: any) {
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
      <div className={`hidden md:flex flex-col gap-0 overflow-auto h-full`}>
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
      {showMessage && path === `/messaging/thread/${messageSlug}` && (
        <MobileMessageId showMessage={showMessage} messageSlug={messageSlug} />
      )}
      {showMessage && path === `/messaging/thread/new` && (
        <MobileNewPage userInfo={userInfo} />
      )}
    </>
  );
}

export default RecentMessage;
