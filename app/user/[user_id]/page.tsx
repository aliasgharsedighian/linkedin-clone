import UserImage from "@/components/profile/UserImage";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import UserPageUserInfo from "./UserPageUserInfo";

export const revalidate = 0;

export default async function UserPage({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  await connectDB();
  const { userId } = auth();
  const userInfo: any = await Users.findOne({ userId: user_id }).lean();
  const currentUserInfo: any = await Users.findOne({ userId: userId }).lean();

  const { _id, emailAddress, firstName, imageUrl, lastName, following } =
    userInfo;
  const { headline, currentPosition, country, city } = userInfo?.extendData
    ? userInfo.extendData
    : { headline: null, currentPosition: null, country: null, city: null };
  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5">
      <section className="col-span-full md:col-span-6 w-full">
        <div className="flex flex-col gap-4">
          <UserImage imageUrl={imageUrl} />
          <UserPageUserInfo
            firstName={firstName}
            lastName={lastName}
            id={_id.toString()}
            headline={headline}
            currentPosition={currentPosition}
            country={country}
            city={city}
            user_id={user_id}
            following={following}
            currentUserFollowing={currentUserInfo?.following}
          />
        </div>
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
