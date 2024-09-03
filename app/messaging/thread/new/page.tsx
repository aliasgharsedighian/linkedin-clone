import { Input } from "@/components/ui/input";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import React, { useState } from "react";
import SuggestedFriends from "./SuggestedFriends";
import PostFormMessage from "../PostFormMessage";

const fetchUserData = async (userId: string | null) => {
  const res = await fetch(`http://localhost:5050/api/users/${userId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export default async function NewMessage() {
  await connectDB();
  const { userId } = auth();
  const userInfoDb: any = await Users.findOne({ userId: userId }).lean();
  const userInfo = await fetchUserData(userInfoDb?._id);

  if (userId) {
    return (
      <>
        <div className="py-2 px-3 border-b dark:border-[var(--dark-border)]">
          <p className="font-bold">New Message</p>
        </div>
        <div className="py-1 px-3 border-b dark:border-[var(--dark-border)]">
          <Input
            className="py-1 px-3 h-auto rounded-full"
            placeholder="type a name or multiple names"
          />
        </div>

        <SuggestedFriends userInfo={userInfo} />
      </>
    );
  }
}
