import { IPostDocument } from "@/mongodb/models/Post";
import Comment from "./Comment";
import { UserInfoType } from "@/typing";

function CommentFeed({
  post,
  userInfo,
  revalidateData,
  token,
}: {
  post: IPostDocument;
  userInfo: UserInfoType;
  revalidateData: any;
  token: any;
}) {
  return (
    <div className="space-y-2 mt-3">
      {post.comments?.map((comment) => (
        <Comment
          key={comment._id}
          post={post}
          comment={comment}
          userInfo={userInfo}
          revalidateData={revalidateData}
          token={token}
        />
      ))}
    </div>
  );
}

export default CommentFeed;
