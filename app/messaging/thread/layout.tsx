import { SearchIcon } from "lucide-react";
import HeadMessagingButton from "./HeadMessagingButton";
import RecentMessage from "./RecentMessage";
import PostFormMessage from "./PostFormMessage";
import connectDB from "@/mongodb/db";
import { auth } from "@clerk/nextjs/server";
import { Users } from "@/mongodb/models/users";

const fetchUserData = async (userId: string | null) => {
  const res = await fetch(`http://localhost:5050/api/users/${userId}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export default async function ThreadMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  const { userId } = auth();
  const userInfoDb: any = await Users.findOne({ userId: userId }).lean();
  const userInfo = await fetchUserData(userInfoDb?._id);
  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5 h-full md:h-auto">
      <section className="col-span-full lg:col-span-6 w-full flex flex-col bg-white dark:bg-zinc-800 border dark:border-[var(--dark-border)] rounded-md md:rounded-lg ">
        <div className="sticky md:static top-[67px] flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b dark:border-[var(--dark-border)] bg-white dark:bg-zinc-800 z-10 rounded-t-md">
          <div className="flex items-center gap-4">
            <p className="font-bold">Messaging</p>
            <form className="hidden sm:flex items-center space-x-1 bg-[#edf3f8] dark:bg-[var(--dark-post-background)] dark:border dark:border-[var(--dark-border)] px-2 py-1 rounded-sm">
              <SearchIcon className="h-4 text-gray-400" />
              <input
                type="text"
                name="search-message"
                id="search-message"
                placeholder="search messages"
                className="bg-transparent flex-1 outline-none dark:bg-[var(--dark-post-background)] dark:text-white placeholder:text-sm"
              />
            </form>
          </div>
          <HeadMessagingButton />
        </div>
        <div className="h-full flex w-full">
          <div className="h-full w-full md:basis-2/5 border-r bg-white dark:bg-zinc-800  md:max-h-[calc(100vh-140px)]">
            <RecentMessage userInfo={userInfo} />
          </div>
          <div className="h-full basis-3/5 hidden md:flex  md:max-h-[calc(100vh-140px)]">
            <div className="flex flex-col justify-between text-sm h-full w-full flex-1">
              {children}
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:col-span-2 justify-center">test2</section>
    </div>
  );
}
