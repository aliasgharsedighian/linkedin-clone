"use client";

import { Edit2Icon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";

interface PageProps {
  firstName: string;
  lastName: string;
  id: any;
}

function UserInfo({ firstName, lastName, id }: PageProps) {
  return (
    <div className="flex flex-col gap-2 mx-6">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <div className="rounded-full">
              <Edit2Icon size={20} />
            </div>
          </DialogTrigger>
          <DialogContent className="mx-0 px-0">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-start mx-4">
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            <EditProfileForm id={id} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">
          {firstName} {lastName}
        </p>
        <p>Frontend Developer</p>
      </div>
      <p className="text-sm text-gray-500">
        {"Rahyab Payam Gostaran Co."} {"Islamic Azad University"}
      </p>
      <p className="text-sm text-gray-500">
        {"City"},{"Country"}
      </p>
      <p className="text-sm text-sky-600">500+ connections</p>
    </div>
  );
}

export default UserInfo;
