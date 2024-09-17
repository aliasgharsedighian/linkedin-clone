import React from "react";
import PostFormMessage from "../PostFormMessage";
import ReactTimeago from "react-timeago";
import Image from "next/image";
import { MessagingData } from "@/mock-data/MessagingMock";
import { auth } from "@clerk/nextjs/server";
import ChatContainer from "./ChatContainer";

function UserMessaging({
  params: { message_id },
}: {
  params: { message_id: string };
}) {
  const { userId } = auth();

  return (
    <>
      <ChatContainer userId={userId} messageSlug={message_id} />
      <PostFormMessage />
    </>
  );
}

export default UserMessaging;
