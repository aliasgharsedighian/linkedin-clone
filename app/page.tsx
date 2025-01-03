import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/Post";
import connectMySql from "@/mySqldb/db";
import { connectRedisDb } from "@/redisdb/db";
import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { SignedInProvider } from "./SignedInProvider";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { GET_ALL_POSTS } from "@/utils/constants";

export const revalidate = 0;

const fetchPosts = async (token: any) => {
  const myHeaders = new Headers();
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(GET_ALL_POSTS, {
    next: { revalidate: 0 },
    headers: myHeaders,
  });
  const data = await res.json();
  return data.data;
};

export default async function Home() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  const posts = await fetchPosts(token);

  async function revalidateData() {
    "use server";

    revalidatePath(`/`);
  }

  return (
    <div className="grid md:grid-cols-8 gap-6 mt-5 sm:px-5">
      <section className="md:col-span-2 justify-center">
        <UserInformation posts={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedInProvider>
          <PostForm token={token} revalidateData={revalidateData} />
        </SignedInProvider>

        <PostFeed posts={posts} token={token} revalidateData={revalidateData} />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
  );
}
