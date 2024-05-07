import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import React from "react";
import Image from "next/image";
import UserInfo from "@/components/profile/UserInfo";
import UserImage from "@/components/profile/UserImage";

export const revalidate = 0;

export default async function ProfilePage() {
  await connectDB();
  const { userId } = auth();
  const userInfo = await Users.findOne({ userId: userId });

  const { _id, emailAddress, firstName, imageUrl, lastName } = userInfo;
  const { headline, currentPosition, country, city } = userInfo?.extendData;

  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5">
      <section className="col-span-full md:col-span-6 w-full">
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
          />
        </div>
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
