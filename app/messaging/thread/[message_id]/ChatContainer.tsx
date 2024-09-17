"use client";

import { MessagingData } from "@/mock-data/MessagingMock";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactTimeago from "react-timeago";

function ChatContainer({ userId, messageSlug }: any) {
  const chatEndRef = useRef<any>(null);
  const [data, setData] = useState<any>();

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

  return (
    <>
      <div className="py-1 px-3 border-b">
        <p className="font-bold">
          {data ? (
            data?.users?.length > 1 ? (
              <span>group message</span>
            ) : (
              `${data?.users[0]?.firstname} ${data?.users[0]?.lastname}`
            )
          ) : (
            <span>Loading...</span>
          )}
        </p>
        <span className="text-[12px]">Active Now</span>
      </div>
      <div className="bg-gray-200/80 dark:bg-slate-800 flex flex-col gap-3 px-3 border-b dark:border-[var(--dark-border)] flex-1 overflow-auto py-3">
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
                      width={600}
                      height={600}
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
    </>
  );
}

export default ChatContainer;
