"use client";
import { Briefcase, HomeIcon, MessageSquare, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function HeaderNavigation() {
  const path = usePathname();
  return (
    <>
      <Link
        href="/"
        className={`icon ${
          path === "/" ? "border-b-2 border-black dark:border-white" : ""
        }`}
      >
        <HomeIcon
          className={`h-6 md:h-5  ${
            path === "/"
              ? "stroke-gray-950"
              : "stroke-gray-300 dark:stroke-gray-950"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/"
              ? "text-black font-bold dark:text-white"
              : "text-gray-400 font-normal"
          }`}
        >
          Home
        </p>
      </Link>

      <Link
        href="/profile"
        className={`icon ${
          path === "/profile" ? "border-b-2 border-black dark:border-white" : ""
        }`}
      >
        <UserIcon
          className={`h-6 md:h-5 ${
            path === "/profile"
              ? "stroke-gray-950"
              : "stroke-gray-300 dark:stroke-gray-950"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/profile"
              ? "text-black font-bold dark:text-white"
              : "text-gray-400 font-normal"
          }`}
        >
          Profile
        </p>
      </Link>

      <Link
        href="/"
        className={`icon ${
          path === "/jobs" ? "border-b-2 border-black dark:border-white" : ""
        }`}
      >
        <Briefcase
          className={`h-6 md:h-5 ${
            path === "/jobs"
              ? "stroke-gray-950"
              : "stroke-gray-300 dark:stroke-gray-950"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path === "/jobs"
              ? "text-black font-bold dark:text-white"
              : "text-gray-400 font-normal"
          }`}
        >
          Jobs
        </p>
      </Link>
      <Link
        href="/messaging"
        className={`icon ${
          path.startsWith("/messaging")
            ? "border-b-2 border-black dark:border-white"
            : ""
        }`}
      >
        <MessageSquare
          className={`h-6 md:h-5 ${
            path.startsWith("/messaging")
              ? "stroke-gray-950"
              : "stroke-gray-300 dark:stroke-gray-950"
          }`}
        />
        <p
          className={`hidden sm:inline-block  ${
            path.startsWith("/messaging")
              ? "text-black font-bold dark:text-white"
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
