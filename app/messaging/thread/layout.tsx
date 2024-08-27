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
    <div className="grid md:grid-cols-8 gap-6 sm:px-5 mt-10">
      <section className="col-span-full md:col-span-6 w-full flex flex-col bg-white border rounded-md md:rounded-lg max-h-screen">
        <div className="flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b">
          <div className="flex items-center gap-4">
            <p className="font-bold">Messaging</p>
            <form className="flex items-center space-x-1 bg-[#edf3f8] dark:bg-[var(--dark-post-background)] dark:border dark:border-[var(--dark-border)] px-2 py-1 rounded-sm">
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
        <div className="flex w-full">
          <div className="basis-2/5 border-r">
            <RecentMessage />
          </div>
          <div className="basis-3/5">
            <div className="flex flex-col text-sm h-full w-full">
              {children}
            </div>
          </div>
        </div>
      </section>
      <section className="hidden md:col-span-2 justify-center">test2</section>
    </div>
  );
}
