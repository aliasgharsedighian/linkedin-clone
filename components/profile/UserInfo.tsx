"use client";

import { Edit2Icon } from "lucide-react";
import React, { useState } from "react";
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
  headline: string;
  currentPosition: string;
  country: string;
  city: string;
}

function UserInfo({
  firstName,
  lastName,
  id,
  headline,
  currentPosition,
  country,
  city,
}: PageProps) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="flex flex-col gap-2 mx-6">
      <div className="flex justify-end">
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
            <EditProfileForm id={id} setOpenDialog={setOpenDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">
          {firstName} {lastName}
        </p>
        <p>{headline}</p>
      </div>
      <p className="text-sm text-gray-500">
        {currentPosition} {"Islamic Azad University"}
      </p>
      {country ||
        (city && (
          <p className="text-sm text-gray-500">
            {city},{country}
          </p>
        ))}
      <p className="text-sm text-sky-600">500+ connections</p>
    </div>
  );
}

export default UserInfo;
