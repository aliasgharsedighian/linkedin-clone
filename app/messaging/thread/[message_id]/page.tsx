import React from "react";
import PostFormMessage from "../PostFormMessage";

function UserMessaging({
  params: { message_id },
}: {
  params: { message_id: string };
}) {
  return (
    <>
      <div className="py-1 px-3 border-b">
        <p className="font-bold">Ali Asghar Sedighian</p>
        <span className="text-[12px]">Active Now</span>
      </div>
      <div className="px-3 border-b dark:border-[var(--dark-border)] flex-1 max-h-[500px] overflow-auto">
        <p>body test{message_id}</p>
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p> <p>body test{message_id}</p>{" "}
        <p>body test{message_id}</p>
      </div>
      <PostFormMessage />
    </>
  );
}

export default UserMessaging;
