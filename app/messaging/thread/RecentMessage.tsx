import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const CreateArray = (length: number) => [...Array(length)];

function RecentMessage() {
  return (
    <div className="flex flex-col gap-0 overflow-auto max-h-[700px] ">
      <Link
        href="/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
        className="border-l-4 border-[var(--base-green)] "
      >
        <div className="px-4 py-6 bg-[#edf3f8] hover:bg-gray-200 flex items-start gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              {"Ali Asghar".charAt(0)}
              {"Sedighian".charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm w-full flex items-start justify-between">
            <div>
              <p className="">Ali Asghar Sedighian</p>
              <p>You: خیلی ممنون ❤️</p>
            </div>
            <div>
              <p>Jul 24</p>
            </div>
          </div>
        </div>
      </Link>
      {CreateArray(10).map((n, i) => (
        <Link
          key={i}
          href="/messaging/thread/user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL"
          className=""
        >
          <div className="px-4 py-6 hover:bg-gray-200 flex items-start gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {"Ali Asghar".charAt(0)}
                {"Sedighian".charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm w-full flex items-start justify-between">
              <div>
                <p className="">Ali Asghar Sedighian</p>
                <p>You: خیلی ممنون ❤️</p>
              </div>
              <div>
                <p>Jul 24</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecentMessage;
