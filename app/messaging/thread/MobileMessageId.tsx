"use client";

import React, { useEffect, useRef, useState } from "react";
import PostFormMessage from "./PostFormMessage";
import { MessagingData } from "@/mock-data/MessagingMock";
import Image from "next/image";
import ReactTimeago from "react-timeago";

function MobileMessageId({ showMessage, messageSlug, userId }: any) {
  const chatEndRef = useRef<any>(null);
  const [data, setData] = useState<any>([]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setData(
      MessagingData.allChats.find((item: any) => item.messageId === messageSlug)
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  // useEffect(() => {
  //   console.log(data);
  // });
  return (
    <div
      className={`flex-col flex md:hidden justify-between h-[calc(100vh-7.5rem)] ${
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
      <div className="bg-gray-200/80 dark:bg-slate-800 flex flex-col gap-2 px-3 border-b dark:border-[var(--dark-border)] flex-1 flex-grow h-full md:max-h-[500px] overflow-y-auto break-words w-screen py-3">
        {data?.chatsList?.length > 0
          ? data?.chatsList.map((item: any) => (
              <React.Fragment key={item._id}>
                {item.message.fileOrImageUrl ? (
                  <div
                    className={`w-full flex flex-col gap-2 pb-2 rounded-t-xl rounded-b-xl ${
                      userId === item.userInfo.userId
                        ? "items-end justify-end bg-green-50 dark:bg-sky-500"
                        : "items-start justify-start bg-white dark:bg-zinc-700"
                    }`}
                  >
                    <Image
                      className="w-full rounded-t-xl"
                      src={item.message.fileOrImageUrl}
                      width={200}
                      height={200}
                      alt="message-caption"
                    />

                    <div
                      className={`flex items-end justify-between w-full gap-6 px-2 ${
                        userId === item.userInfo.userId ? "" : ""
                      }`}
                    >
                      <p>{item.message.text}</p>
                      <span className="text-[10px]">
                        <ReactTimeago date={new Date(item.createdAt)} />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full flex flex-col gap-1 ${
                      userId === item.userInfo.userId
                        ? "items-end justify-end"
                        : "items-start justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-6 w-fit rounded-xl px-3 py-2 ${
                        userId === item.userInfo.userId
                          ? "bg-green-50 dark:bg-sky-500"
                          : " bg-white dark:bg-zinc-700"
                      }`}
                    >
                      <p>{item.message.text}</p>
                      <span className="text-[10px]">
                        <ReactTimeago date={new Date(item.createdAt)} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </React.Fragment>
            ))
          : null}
      </div>
      <PostFormMessage />
    </div>
  );
}

export default MobileMessageId;
