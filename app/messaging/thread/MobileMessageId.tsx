"use client";

import React from "react";
import PostFormMessage from "./PostFormMessage";

function MobileMessageId({ showMessage, messageSlug }: any) {
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
      <div className="px-3 border-b dark:border-[var(--dark-border)] flex-1 flex-grow h-full md:max-h-[500px] overflow-y-auto break-words w-screen py-3">
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
        <p>body test{messageSlug}</p> <p>body test{messageSlug}</p> last
      </div>
      <PostFormMessage />
    </div>
  );
}

export default MobileMessageId;
