"use server";

import { currentUser } from "@clerk/nextjs/server";

export default async function deleteCommentAction(commentId: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  //   const commment = await
}
