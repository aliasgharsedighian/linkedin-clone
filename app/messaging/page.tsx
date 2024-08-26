import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function MessagingPage() {
  const { userId } = auth();
  if (userId) {
    redirect(`/messaging/thread/${userId}`);
  }
  return;
}

export default MessagingPage;
