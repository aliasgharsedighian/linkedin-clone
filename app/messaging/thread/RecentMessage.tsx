"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PostFormMessage from "./PostFormMessage";
import MobileMessageId from "./MobileMessageId";
import MobileNewPage from "./MobileNewPage";
import ReactTimeago from "react-timeago";
import { useAppStore } from "@/store/store";

function RecentMessage({ userInfo, data, userId }: any) {
  const path = usePathname();
  const { showMessage, setShowMessage } = useAppStore();
  const [messageSlug, setMessageSlug] = useState("");

  const getMessageData = (messageSlug: string) => {
    setShowMessage(true);
    setMessageSlug(messageSlug);
  };

  return (
    <>
      {/* this is for desktop mode */}
      <div className={`hidden md:flex flex-col gap-0 overflow-auto h-full`}>
        {data &&
          data.map((item: any) => (
            <Link
              key={item.messageId}
              href={`/messaging/thread/${item.messageId}`}
              className={`  ${
                path === `/messaging/thread/${item.messageId}`
                  ? "border-l-4 border-[var(--base-green)]"
                  : ""
              }`}
            >
              {item.users.length > 1 ? (
                <div>Group message</div>
              ) : (
                <div
                  className={`px-4 py-6 hover:bg-gray-200 dark:hover:bg-zinc-600 flex items-start gap-3 ${
                    path === `/messaging/thread/${item.messageId}`
                      ? "bg-[#edf3f8] dark:bg-zinc-600"
                      : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage
                      src={item.users[0].profileImage}
                      alt="profile-image"
                    />
                    <AvatarFallback>
                      {item.users[0].firstname.charAt(0)}
                      {item.users[0].lastname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm w-full flex items-start justify-between">
                    <div>
                      <p className="">{`${item.users[0].firstname} ${item.users[0].lastname}`}</p>
                      <p className="line-clamp-1">
                        {userId === item.lastMessage.userId ? "You:" : null}{" "}
                        {item.lastMessage.text}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px]">
                        <ReactTimeago
                          date={new Date(item.lastMessage.updatedAt)}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          ))}

        {/* {CreateArray(10).map((n, i) => (
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
                  ? "bg-[#edf3f8] dark:bg-zinc-600"
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
        ))} */}
      </div>

      {!showMessage && (
        <div className={`flex md:hidden flex-col gap-0 overflow-auto`}>
          {data &&
            data.map((item: any) => (
              <Link
                key={item.messageId}
                onClick={() => getMessageData(item.messageId)}
                href={`/messaging/thread/${item.messageId}`}
                className={`  ${
                  path === `/messaging/thread/${item.messageId}`
                    ? "border-l-4 border-[var(--base-green)]"
                    : ""
                }`}
              >
                {item.users.length > 1 ? (
                  <div>Group message</div>
                ) : (
                  <div
                    className={`px-4 py-6 hover:bg-gray-200 flex items-start gap-3 ${
                      path === `/messaging/thread/${item.messageId}`
                        ? "bg-[#edf3f8] dark:bg-zinc-600"
                        : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={item.users[0].profileImage}
                        alt="profile-image"
                      />
                      <AvatarFallback>
                        {item.users[0].firstname.charAt(0)}
                        {item.users[0].lastname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm w-full flex items-start justify-between">
                      <div>
                        <p className="">{`${item.users[0].firstname} ${item.users[0].lastname}`}</p>
                        <p className="line-clamp-1">
                          {userId === item.lastMessage.userId ? "You:" : null}
                          {item.lastMessage.text}
                        </p>
                      </div>
                      <div className="text-[12px]">
                        <p>
                          <ReactTimeago
                            date={new Date(item.lastMessage.updatedAt)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
        </div>
      )}

      {/* this is for mobile mode */}
      {showMessage && path === `/messaging/thread/${messageSlug}` && (
        <MobileMessageId
          showMessage={showMessage}
          messageSlug={messageSlug}
          userId={userId}
        />
      )}
      {showMessage && path === `/messaging/thread/new` && (
        <MobileNewPage userInfo={userInfo} userId={userId} />
      )}
    </>
  );
}

export default RecentMessage;
