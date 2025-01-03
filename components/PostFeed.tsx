import { IPostDocument } from "@/mongodb/models/Post";
import React from "react";
import Post from "./Post";

function PostFeed({
  posts,
  token,
  revalidateData,
}: {
  posts: IPostDocument[];
  token: any;
  revalidateData: any;
}) {
  return (
    <div className="space-y-2 pb-20">
      {posts.map((post) => (
        <Post key={post._id} post={post} revalidateData={revalidateData} />
      ))}
    </div>
  );
}

export default PostFeed;
