import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import Widget from "@/components/Widget";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/Post";
import connectMySql from "@/mySqldb/db";
import { connectRedisDb } from "@/redisdb/db";
import { SignedIn } from "@clerk/nextjs";

export const revalidate = 0;

export default async function Home() {
  await connectDB();
  // await connectMySql();
  const posts = await Post.getAllPosts();

  // await connectRedisDb.set("hello", "hello test");

  return (
    <div className="grid md:grid-cols-8 gap-6 mt-5 sm:px-5">
      <section className="md:col-span-2 justify-center">
        <UserInformation posts={posts} />
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
          <PostForm />
        </SignedIn>

        <PostFeed posts={posts} />
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
  );
}
