import RecentMessage from "./RecentMessage";
import connectDB from "@/mongodb/db";
import { auth } from "@clerk/nextjs/server";
import { Users } from "@/mongodb/models/users";
import { MessagingData } from "@/mock-data/MessagingMock";
import HeaderMessaging from "./HeaderMessaging";
import { SocketProvider } from "@/app/context/SocketContext";

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
    <SocketProvider>
      <div className="grid md:grid-cols-8 gap-6 sm:px-5 h-full md:h-auto min-h-[80vh]">
        <section className="col-span-full lg:col-span-6 w-full flex flex-col bg-white dark:bg-zinc-800 border dark:border-[var(--dark-border)] rounded-md md:rounded-lg ">
          <HeaderMessaging userId={userId} />
          <div className="h-full flex w-full">
            <div className="h-full w-full md:basis-2/5 border-r bg-white dark:bg-zinc-800  md:max-h-[calc(100vh-140px)]">
              <RecentMessage
                userInfo={userInfo}
                data={MessagingData?.allMessages[0]?.messageIndex}
                userId={userId}
              />
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
    </SocketProvider>
  );
}
