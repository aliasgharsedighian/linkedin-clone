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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfileForm from "./EditProfileForm";
import Link from "next/link";

interface PageProps {
  userInfo: any;
  dbId: string;
}

function UserInfo({ userInfo, dbId }: PageProps) {
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
          <DialogContent className="mx-0 px-0 dark:bg-[var(--dark-post-background)] dark:border-[var(--dark-border)]">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-start mx-4 dark:text-white">
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            <EditProfileForm id={dbId} setOpenDialog={setOpenDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4 dark:text-white">
        <p className="text-xl font-bold">
          {userInfo.firstName} {userInfo.lastName}
        </p>
        <p>{userInfo?.extendData?.headline}</p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {userInfo.currentPosition} {"Islamic Azad University"}
      </p>
      {userInfo?.extendData?.country ||
        (userInfo?.extendData?.city && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo?.extendData.city},{userInfo?.extendData.country}
          </p>
        ))}
      <Dialog>
        <DialogTrigger className="flex flex-end">
          <p className="text-sm text-sky-600">
            {userInfo.following?.length ? userInfo.following.length : "0"}{" "}
            connections
          </p>
        </DialogTrigger>
        <DialogContent className="mx-0 px-0 dark:bg-[var(--dark-post-background)] dark:border-[var(--dark-border)]">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-start mx-4 dark:text-white">
              Conncetions
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {userInfo.following ? (
              userInfo.following.map((follow: any) => (
                <Link
                  href={`/user/${follow?.userId}`}
                  key={follow.userId}
                  className="flex items-center gap-2 mx-4"
                >
                  <Avatar>
                    <AvatarImage src={follow?.imageUrl} />
                    <AvatarFallback>
                      {follow?.firstName?.charAt(0)}
                      {follow?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-white">
                      {follow.firstName} {follow?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      @{follow?.firstName}
                      {follow?.firstName}-{follow?.userId?.toString().slice(-4)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="mx-4 dark:text-white">
                you have not any connections
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserInfo;
