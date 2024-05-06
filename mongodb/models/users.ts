import { IUserData } from "@/types/userData";
import mongoose, { Schema, Document, models } from "mongoose";

export interface IUsersBase {
  data: IUserData | any;
  object: string;
  type: string;
}

export interface IUsers extends Document, IUsersBase {
  createdAt: Date;
  updatedAt: Date;
}

const UsersSchema = new Schema<IUsers>(
  {
    data: {
      created_at: { type: Number },
      emailAddress: { type: String },
      firstName: { type: String },
      userId: { type: String },
      imageUrl: { type: String },
      lastName: { type: String },
    },
  },
  { timestamps: true }
);

export const Users = models.Users || mongoose.model<any>("Users", UsersSchema);
