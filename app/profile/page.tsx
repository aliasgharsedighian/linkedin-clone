import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import React from "react";
import UserInfo from "@/components/profile/UserInfo";
import ThemeSetting from "@/components/profile/ThemeSetting";
import dynamic from "next/dynamic";
import { revalidatePath } from "next/cache";
import ProfileImage from "./ProfileImage";

const NotficationCheck = dynamic(
  () => import("@/components/NotficationCheck"),
  { ssr: false }
);

export const revalidate = false;

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
  const userInfo = await fetchUserData(userInfoDb?._id);

  async function revalidateData() {
    "use server";
    revalidatePath("/profile");
  }

  if (userId) {
    return (
      <>
        <NotficationCheck userInfo={userInfo} />
        <div className="grid md:grid-cols-8 gap-6 sm:px-5">
          <section className="col-span-full md:col-span-6 w-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <ProfileImage
                userInfo={userInfo}
                userId={userId}
                revalidateData={revalidateData}
              />
              <UserInfo userInfo={userInfo} dbId={userInfoDb?._id.toString()} />
            </div>
            <ThemeSetting />
          </section>
          <section className="hidden md:col-span-2 justify-center">
            test2
          </section>
        </div>
      </>
    );
  }
}
