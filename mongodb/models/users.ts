import { IUserData } from "@/types/userData";
import mongoose, { Schema, Document, models } from "mongoose";

export interface IUsersBase {
  created_at: number;
  emailAddress: string;
  firstName: string;
  userId: string;
  pushNotficationToken: string;
  imageUrl: string;
  lastName: string;
  extendData: {
    headline: string;
    currentPosition: string;
    country: string;
    city: string;
  };
  following: [
    {
      emailAddress: string;
      userId: string;
      firstName: string;
      lastName: string;
      imageUrl: string;
    }
  ];
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
    pushNotficationToken: { type: String },
    imageUrl: { type: String },
    lastName: { type: String },
    extendData: {
      headline: { type: String },
      currentPosition: { type: String },
      country: { type: String },
      city: { type: String },
    },
    following: {
      emailAddress: { type: String },
      userId: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      imageUrl: { type: String },
    },
  },
  { timestamps: true }
);

export const Users = models.Users || mongoose.model<any>("Users", UsersSchema);
