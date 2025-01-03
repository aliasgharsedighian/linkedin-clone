"use client";

import React from "react";
import { SignedInProvider } from "@/app/SignedInProvider";
import { SignedOutProvider } from "@/app/SignedOutProvider";
import useUserInfo from "@/hooks/useUserInfo";
import SignInButton from "./SignInButton";
import UserButton from "./UserButton";

function HeaderSignButton() {
  return (
    <>
      <SignedInProvider>
        <UserButton />
      </SignedInProvider>

      <SignedOutProvider>
        <SignInButton variant="secondary" />
      </SignedOutProvider>
    </>
  );
}

export default HeaderSignButton;
