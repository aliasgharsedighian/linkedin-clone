import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import React from "react";
import UserInfo from "@/components/profile/UserInfo";
import ThemeSetting from "@/components/profile/ThemeSetting";
import dynamic from "next/dynamic";
import { revalidatePath } from "next/cache";
import ProfileImage from "./ProfileImage";
import { cookies } from "next/headers";

const NotficationCheck = dynamic(
  () => import("@/components/NotficationCheck"),
  { ssr: false }
);

export const revalidate = false;

const fetchUserData = async (userId: string | null) => {
  const res = await fetch(`${process.env.API_ADDRESS}users/${userId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const fetchUserByToken = async (token: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}api/auth/user-info-bearer`,
    {
      cache: "no-cache",
      headers: myHeaders,
    }
  );
  const data = await res.json();
  return data.data;
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  await connectDB();
  const { userId } = auth();

  async function revalidateData() {
    "use server";
    revalidatePath("/profile");
  }

  if (userId) {
    const userInfoDb: any = await Users.findOne({ userId: userId }).lean();
    const userInfo = await fetchUserData(userInfoDb?._id);
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
  const userInfo = await fetchUserByToken(token);
  const userInfoDb: any = await Users.findOne({
    userId: userInfo.userId,
  }).lean();
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
        <section className="hidden md:col-span-2 justify-center">test2</section>
      </div>
    </>
  );
}
