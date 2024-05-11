import { SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MobileSearchModal from "./MobileSearchModal";
import HeaderNavigation from "./HeaderNavigation";
import Link from "next/link";

function Header() {
  return (
    <div className="relative flex items-center max-w-6xl mx-auto">
      <Link href="/">
        <Image
          className="rounded-lg mr-4 sm:mr-0"
          src="/assets/images/logo.png"
          width={40}
          height={40}
          alt="logo"
        />
      </Link>

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

      <div className="flex items-center gap-1 md:gap-4 lg:gap-6 px-2 md:px-6 justify-between md:justify-end w-full">
        <MobileSearchModal />
        <HeaderNavigation />

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
