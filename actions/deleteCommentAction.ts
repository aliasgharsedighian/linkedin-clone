"use server";

import { currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export default async function deleteCommentAction(commentId: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const comment = await mongoose
    .model("Comment")
    .findOne({ _id: new ObjectId(commentId) });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.user.userId !== user.id) {
    throw new Error("Comment does not blong to the user");
  }

  try {
    await mongoose.model("Comment").deleteOne({ _id: commentId });
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occurred while deleting the comment");
  }
}
