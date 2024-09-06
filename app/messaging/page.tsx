import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function MessagingPage() {
  const { userId } = auth();
  if (userId) {
    redirect(`/messaging/thread/new`);
  }
  return;
}

export default MessagingPage;
