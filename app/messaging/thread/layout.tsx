import { SearchIcon } from "lucide-react";
import HeadMessagingButton from "./HeadMessagingButton";
import RecentMessage from "./RecentMessage";
import PostFormMessage from "./PostFormMessage";

export default function ThreadMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-8 gap-6 sm:px-5 mt-3 md:mt-8">
      <section className="col-span-full lg:col-span-6 w-full flex flex-col bg-white border rounded-md md:rounded-lg max-h-screen">
        <div className="sticky md:static top-[67px] flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b bg-white z-10 rounded-t-md">
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
        <div className="flex w-full max-h-dvh">
          <div className="w-full md:basis-2/5 border-r">
            <RecentMessage />
          </div>
          <div className="basis-3/5 hidden md:flex">
            <div className="flex flex-col text-sm h-full w-full">
              {children}
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:col-span-2 justify-center">test2</section>
    </div>
  );
}
