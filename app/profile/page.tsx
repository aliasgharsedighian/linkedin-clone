import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import React from "react";
import Image from "next/image";
import UserInfo from "@/components/profile/UserInfo";
import UserImage from "@/components/profile/UserImage";
import ThemeSetting from "@/components/profile/ThemeSetting";

export const revalidate = 0;

export default async function ProfilePage() {
  await connectDB();
  const { userId } = auth();
  const userInfo: any = await Users.findOne({ userId: userId }).lean();

  const { _id, emailAddress, firstName, imageUrl, lastName, following } =
    userInfo;
  const { headline, currentPosition, country, city } = userInfo?.extendData
    ? userInfo.extendData
    : { headline: null, currentPosition: null, country: null, city: null };

  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5">
      <section className="col-span-full md:col-span-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <UserImage imageUrl={imageUrl} />
          <UserInfo
            firstName={firstName}
            lastName={lastName}
            id={_id.toString()}
            headline={headline}
            currentPosition={currentPosition}
            country={country}
            city={city}
            following={following}
          />
        </div>
        <ThemeSetting />
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
