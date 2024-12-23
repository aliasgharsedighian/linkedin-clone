"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/app/login/LoginForm";

interface PageProps {
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

function SignInButton({ variant }: PageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Sign in - Sign up</DialogTitle>
        </DialogHeader>

        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

export default SignInButton;
