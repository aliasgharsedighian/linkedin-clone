import { IPostDocument } from "@/mongodb/models/Post";
import Comment from "./Comment";

function CommentFeed({ post }: { post: IPostDocument }) {
  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <Comment key={comment._id} post={post} comment={comment} />
      ))}
    </div>
  );
}

export default CommentFeed;
