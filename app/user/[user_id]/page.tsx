import UserImage from "@/components/profile/UserImage";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import UserPageUserInfo from "./UserPageUserInfo";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { user_id: string };
}) {
  const userInfoDb: any = await Users.findOne({
    userId: params.user_id,
  }).lean();
  const detail = await fetchUserData(userInfoDb._id);

  if (!detail) return notFound;

  const title = `${detail.firstName} ${detail.lastName}`;

  return {
    title,
  };
}

const fetchUserData = async (userId: string | null) => {
  const res = await fetch(`${process.env.API_ADDRESS}users/${userId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export default async function UserPage({
  params: { user_id },
}: {
  params: { user_id: string };
}) {
  await connectDB();
  const { userId } = auth();
  const userInfoDb: any = await Users.findOne({ userId: user_id }).lean();
  const userInfo = await fetchUserData(userInfoDb._id);
  const currentUserInfo: any = await Users.findOne({ userId: userId }).lean();

  // const { _id, emailAddress, firstName, imageUrl, lastName, following } =
  //   userInfo;
  // const { headline, currentPosition, country, city } = userInfo?.extendData
  //   ? userInfo.extendData
  //   : { headline: null, currentPosition: null, country: null, city: null };

  if (userId && userId === user_id) {
    redirect("/profile");
  }

  async function revalidateData() {
    "use server";
    revalidatePath(`/user/${userId}`);
  }

  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5">
      <section className="col-span-full md:col-span-6 w-full">
        <div className="flex flex-col gap-4">
          <UserImage userInfo={userInfo} />
          <UserPageUserInfo
            userInfo={userInfo}
            currentUserFollowing={currentUserInfo?.following}
            revalidateData={revalidateData}
          />
        </div>
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
