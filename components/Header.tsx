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

function Header() {
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
          <HomeIcon className="h-6 md:h-5" />
          <p className="hidden sm:inline-block">Home</p>
        </Link>

        <Link href="/" className="icon">
          <UserIcon className="h-6 md:h-5" />
          <p className="hidden sm:inline-block">Network</p>
        </Link>

        <Link href="/" className="icon">
          <Briefcase className="h-6 md:h-5" />
          <p className="hidden sm:inline-block">Jobs</p>
        </Link>
        <Link href="/" className="icon">
          <MessageSquare className="h-6 md:h-5" />
          <p className="hidden sm:inline-block">Messages</p>
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
