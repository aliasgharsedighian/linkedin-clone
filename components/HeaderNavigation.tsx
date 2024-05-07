"use client";
import { Briefcase, HomeIcon, MessageSquare, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function HeaderNavigation() {
  const path = usePathname();
  return (
    <>
      <Link href="/" className="icon">
        <HomeIcon
          className={`h-6 md:h-5 ${
            path === "/" ? "stroke-gray-950" : "stroke-gray-300"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/" ? "text-black font-bold" : "text-gray-400 font-normal"
          }`}
        >
          Home
        </p>
      </Link>

      <Link href="/profile" className="icon">
        <UserIcon
          className={`h-6 md:h-5 ${
            path === "/profile" ? "stroke-gray-950" : "stroke-gray-300"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/profile"
              ? "text-black font-bold"
              : "text-gray-400 font-normal"
          }`}
        >
          Profile
        </p>
      </Link>

      <Link href="/" className="icon">
        <Briefcase
          className={`h-6 md:h-5 ${
            path === "/jobs" ? "stroke-gray-950" : "stroke-gray-300"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/jobs"
              ? "text-black font-bold"
              : "text-gray-400 font-normal"
          }`}
        >
          Jobs
        </p>
      </Link>
      <Link href="/" className="icon">
        <MessageSquare
          className={`h-6 md:h-5 ${
            path === "/message" ? "stroke-gray-950" : "stroke-gray-300"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/message"
              ? "text-black font-bold"
              : "text-gray-400 font-normal"
          }`}
        >
          Messages
        </p>
      </Link>
    </>
  );
}

export default HeaderNavigation;
