import React from "react";

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
      <div className="px-3 border-b flex-1 max-h-[500px] overflow-auto">
        <p>body test</p>
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p> <p>body test</p>{" "}
        <p>body test</p> <p>body test</p> <p>body test</p>
      </div>
    </>
  );
}

export default UserMessaging;
