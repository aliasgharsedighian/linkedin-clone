import { IUserData } from "@/types/userData";
import mongoose, { Schema, Document, models } from "mongoose";

export interface IUsersBase {
  created_at: number;
  emailAddress: string;
  firstName: string;
  userId: string;
  imageUrl: string;
  lastName: string;
}

export interface IUsers extends Document, IUsersBase {
  createdAt: Date;
  updatedAt: Date;
}

const UsersSchema = new Schema<IUsers>(
  {
    created_at: { type: Number },
    emailAddress: { type: String },
    firstName: { type: String },
    userId: { type: String },
    imageUrl: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

export const Users = models.Users || mongoose.model<any>("Users", UsersSchema);
