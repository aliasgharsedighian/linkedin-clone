"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import SignOutButton from "./SignOutButton";
import { useAppStore } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

function UserButton() {
  const { userInfo } = useAppStore();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 cursor-pointer hover:text-[var(--yellow)]">
          {/* <span className="text-sm font-IRANSansBold hidden sm:flex">
            {!userInfo?.firstName || !userInfo?.lastName
              ? "پروفایل کاربر"
              : ` ${userInfo.firstName} ${userInfo.lastName}`}
          </span> */}
          <Avatar>
            <AvatarImage
              src={userInfo?.imageUrl || "/assets/images/blank-profile.webp"}
            />

            <AvatarFallback>
              {userInfo?.firstName.charAt(0)} {userInfo?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-white border p-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="hidden md:hidden flex-col gap-2 border-b pt-3 pb-2 px-3">
              <Link
                // onClick={() => setOpenProfilePop(false)}
                className={`flex items-center gap-1 hover:text-[var(--yellow)] ${
                  true ? "text-[var(--yellow)]" : ""
                }`}
                href="/dashboard/profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>

                <p>Profile</p>
              </Link>
            </div>
            <div className="pb-3 pt-2 px-3">
              <SignOutButton />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserButton;
