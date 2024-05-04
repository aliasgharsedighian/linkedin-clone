import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/Post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { LikePostRequestBody } from "../../../like/route";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string; comments_id: string } }
) {
  await connectDB();

  try {
    const posts = await Post.getAllPosts();
    const currentPost = posts.filter((post) => post._id === params.post_id);
    if (!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const findComment: any = currentPost[0]?.comments?.filter(
      (comment) => comment._id === params.comments_id
    );
    const likes = findComment[0]?.likes ?? [];
    return NextResponse.json(likes);
  } catch (error) {}
}

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  auth().protect();
  await connectDB();

  const { userId }: LikePostRequestBody = await request.json();

  try {
    const post = await Post.findById(params.post_id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await post.likeComment(userId);
    return NextResponse.json({ message: "Post liked successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while liking on the comment" },
      { status: 500 }
    );
  }
}
