import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import React from "react";
import Image from "next/image";
import UserInfo from "@/components/profile/UserInfo";
import UserImage from "@/components/profile/UserImage";
import ThemeSetting from "@/components/profile/ThemeSetting";

export const revalidate = 0;

const fetchUserData = async (userId: string | null) => {
  const res = await fetch(`http://localhost:5050/api/users/${userId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export default async function ProfilePage() {
  await connectDB();
  const { userId } = auth();
  const userInfoDb: any = await Users.findOne({ userId: userId }).lean();
  const userInfo = await fetchUserData(userInfoDb._id);

  console.log();
  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5">
      <section className="col-span-full md:col-span-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <UserImage userInfo={userInfo} />
          <UserInfo userInfo={userInfo} dbId={userInfoDb._id.toString()} />
        </div>
        <ThemeSetting />
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
