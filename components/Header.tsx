import {
  SearchIcon,
  HomeIcon,
  UserIcon,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MobileSearchModal from "./MobileSearchModal";
import { headers } from "next/headers";

function Header() {
  const headersList = headers();
  const protocol = "https://";
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  return (
    <div className="relative flex items-center p-2 max-w-6xl mx-auto">
      <Image
        className="rounded-lg mr-4 sm:mr-0"
        src="/assets/images/logo.png"
        width={40}
        height={40}
        alt="logo"
      />

      <div className="hidden sm:flex flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-4 px-2 md:px-6 justify-between md:justify-end w-full">
        <MobileSearchModal />
        <Link href="/" className="icon">
          <HomeIcon
            className={`h-6 md:h-5 ${
              fullUrl === protocol + domain + "/"
                ? "stroke-gray-950"
                : "stroke-gray-300"
            }`}
          />
          <p
            className={`hidden sm:inline-block  ${
              fullUrl === protocol + domain + "/"
                ? "text-black font-bold"
                : "text-gray-400 font-normal"
            }`}
          >
            Home
          </p>
        </Link>

        <Link href="/" className="icon">
          <UserIcon
            className={`h-6 md:h-5 ${
              fullUrl === protocol + domain + "/network"
                ? "stroke-gray-950"
                : "stroke-gray-300"
            }`}
          />
          <p
            className={`hidden sm:inline-block  ${
              fullUrl === protocol + domain + "/network"
                ? "text-black font-bold"
                : "text-gray-400 font-normal"
            }`}
          >
            Network
          </p>
        </Link>

        <Link href="/" className="icon">
          <Briefcase
            className={`h-6 md:h-5 ${
              fullUrl === protocol + domain + "/jobs"
                ? "stroke-gray-950"
                : "stroke-gray-300"
            }`}
          />
          <p
            className={`hidden sm:inline-block  ${
              fullUrl === protocol + domain + "/jobs"
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
              fullUrl === protocol + domain + "/message"
                ? "stroke-gray-950"
                : "stroke-gray-300"
            }`}
          />
          <p
            className={`hidden sm:inline-block  ${
              fullUrl === protocol + domain + "/message"
                ? "text-black font-bold"
                : "text-gray-400 font-normal"
            }`}
          >
            Messages
          </p>
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
