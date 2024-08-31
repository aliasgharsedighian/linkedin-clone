import Image from "next/image";
import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MobileSearchModal from "./MobileSearchModal";
import HeaderNavigation from "./HeaderNavigation";
import Link from "next/link";
import SearchUsersInput from "./SearchUsersInput";

function Header() {
  return (
    <div className="relative flex items-center max-w-6xl mx-auto">
      <Link href="/">
        <Image
          className="rounded-lg mr-4 sm:mr-0"
          src="/assets/images/logo.png"
          width={50}
          height={50}
          alt="logo"
        />
      </Link>

      <div className="hidden sm:flex flex-1">
        <SearchUsersInput />
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
