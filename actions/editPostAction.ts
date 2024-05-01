"use server";

import { Post } from "@/mongodb/models/Post";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function editPostAction(postId: string, editText: string) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.userId !== user.id) {
    throw new Error("Post does not blong to the user");
  }

  try {
    await post.editPost(editText);
    revalidatePath("/");
  } catch (error) {
    throw new Error(`An error occurred while updating the post`);
  }
}
