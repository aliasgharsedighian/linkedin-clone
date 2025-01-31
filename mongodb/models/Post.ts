import { IUser } from "@/types/user";
import mongoose, { Schema, Document, models, Model } from "mongoose";
import { Comment, IComment, ICommentBase } from "./comment";
import { ObjectId } from "mongodb";

export interface IPostBase {
  user: IUser;
  text: string;
  imageUrl?: string[];
  comments?: IComment[];
  likes?: string[];
}

export interface IPost extends IPostBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Define the documents methods(for each instance of a post)
interface IPostMethods {
  likePost(userId: string): Promise<void>;
  likeComment(userId: IUser, commentId: string): Promise<void>;
  unlikePost(user: string): Promise<void>;
  unlikeComment(user: IUser, commentId: string): Promise<void>;
  commentOnPost(comment: ICommentBase): Promise<void>;
  getAllComments(): Promise<void>;
  removePost(): Promise<void>;
  editPost(editText: string): Promise<void>;
}

interface IPostStatics {
  getAllPosts(): Promise<IPostDocument[]>;
}

export interface IPostDocument extends IPost, IPostMethods {} //singular instance of a post

interface IPostModel extends IPostStatics, Model<IPostDocument> {} //all posts

const PostSchema = new Schema<IPostDocument>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: { type: [String], default: [] },
    comments: { type: [Schema.Types.ObjectId], ref: "Comment", default: [] },
    likes: { type: [String] },
  },
  {
    timestamps: true,
  }
);

PostSchema.methods.likePost = async function (userId: string) {
  try {
    await this.updateOne({ $addToSet: { likes: userId } });
  } catch (error) {
    console.log("error when liking post", error);
  }
};

PostSchema.methods.likeComment = async function (
  userId: IUser,
  commentId: string
) {
  try {
    await mongoose
      .model("Comment")
      .findOneAndUpdate(
        { _id: new ObjectId(commentId) },
        { $addToSet: { likes: userId } }
      );
  } catch (error) {
    console.log("error when liking comment", error);
  }
};

PostSchema.methods.unlikePost = async function (userId: string) {
  try {
    await this.updateOne({ $pull: { likes: userId } });
  } catch (error) {
    console.log("error when unliking post", error);
  }
};

PostSchema.methods.unlikeComment = async function (
  userId: IUser,
  commentId: string
) {
  try {
    await mongoose
      .model("Comment")
      .findOneAndUpdate(
        { _id: new ObjectId(commentId) },
        { $pull: { likes: userId } }
      );
  } catch (error) {
    console.log("error when unliking comment", error);
  }
};

PostSchema.methods.removePost = async function () {
  try {
    await this.model("Post").deleteOne({ _id: this._id });
  } catch (error) {
    console.log("error when removing post", error);
  }
};

PostSchema.methods.editPost = async function (editText: string) {
  try {
    await this.model("Post").updateOne(
      { _id: this._id },
      { $set: { text: editText } }
    );
  } catch (error) {
    console.log("error when updating post", error);
  }
};

PostSchema.methods.commentOnPost = async function (commentToAdd: ICommentBase) {
  try {
    const comment = await Comment.create(commentToAdd);
    this.comments.push(comment._id);
    await this.save();
  } catch (error) {
    console.log("error when comment on post", error);
  }
};

PostSchema.methods.getAllComments = async function () {
  try {
    await this.populate({
      path: "comments",
      options: { sort: { createdAt: -1 } }, // sort comments by newest first
    });
    return this.comments;
  } catch (error) {
    console.log("error when get all comments", error);
  }
};

PostSchema.statics.getAllPosts = async function () {
  try {
    const posts = await this.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } },
      })
      .lean(); // lean() to conver Mongoose object to plain JS object

    return posts.map((post: IPostDocument) => ({
      ...post,
      _id: post._id.toString(),
      comments: post.comments?.map((comment: IComment) => ({
        ...comment,
        _id: comment._id.toString(),
      })),
    }));
  } catch (error) {
    console.log("error when get all posts", error);
  }
};

export const Post =
  (models.Post as IPostModel) ||
  mongoose.model<IPostDocument>("Post", PostSchema);
