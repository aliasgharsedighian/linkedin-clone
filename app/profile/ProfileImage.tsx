"use client";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store/store";

function ProfileImage({
  userInfo,
  userId,
  revalidateData,
}: {
  userInfo: any;
  userId: any;
  revalidateData: any;
}) {
  const inputProfileImageRef = useRef<any>(null);
  const path = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addPhotoTab, setAddPhotoTab] = useState(false);
  const [previewProfilePhoto, setPrviewProfilePhoto] = useState<string | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] = useState<any>();

  const { setUserInfo } = useAppStore();

  const handleProfileImageSelect = (e: any) => {
    e.preventDefault();
    const uploadFile = e.target.files[0];
    const previewFile = e.target.files?.[0];
    const timestamp = new Date().getTime();
    const file_name = `${"randomUUID"}_${timestamp}`;

    if (previewFile) {
      if (previewFile?.size >= 5000000) {
        toast.error("Max file 5Mb");
        return;
      } else if (
        previewFile.type === "image/jpeg" ||
        previewFile.type === "image/png" ||
        previewFile.type === "image/webp"
      ) {
        const file = new File(
          [uploadFile],
          `${previewFile.name.replaceAll(" ", "-")}`,
          { type: previewFile.type }
        );
        // const file = new File(
        //   [uploadFile],
        //   `${file_name}.${previewFile.type.slice(6)}`,
        //   { type: previewFile.type }
        // );
        setPrviewProfilePhoto(URL.createObjectURL(previewFile));
        setProfileImageFile(file);
      } else {
        toast.error("File format error");
      }
    }
  };

  const handleAddProfileImage = async () => {
    // console.log("test");
    const formdata = new FormData();
    formdata.append("profile-image", profileImageFile);
    // formdata.append("userId", userId);
    formdata.append("userId", userInfo.userId);
    const response = await apiClient.post(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}api/auth/add-profile-image`,
      formdata,
      { withCredentials: true }
    );
    // console.log(response);
    if (response.status === 200 && response.data.data.image) {
      toast.success("Image updated successfully.");
      setAddPhotoTab(false);
      setDialogOpen(false);
      setUserInfo({ ...userInfo, imageUrl: response.data.data.image });
      revalidateData();
    }
  };

  const handleRemoveProfileImage = async () => {
    try {
      const formdata = new FormData();
      formdata.append("userId", userId);
      const response = await apiClient.delete(
        `${process.env.SERVER_ADDRESS}api/auth/remove-profile-image/${userId}`
      );
      if (response.status === 200) {
        toast.success("Image removed successfully.");
        setDialogOpen(false);
        revalidateData();
      }
      if (response.status === 404) {
        toast.error(response.data.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="relative">
      <div className="bg-slate-700 h-32 w-full">
        {path === "/profile" && (
          <div className="w-full flex justify-end">
            <div className="bg-white rounded-full m-4 p-2.5">
              <CameraIcon size={20} className="  fill-sky-600 text-white" />
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setDialogOpen(!dialogOpen);
          if (dialogOpen) {
            setAddPhotoTab(false);
            setDialogOpen(false);
            setPrviewProfilePhoto(null);
          }
        }}
      >
        <DialogTrigger>
          <Image
            className="w-[120px] h-[120px] object-cover mx-8 absolute top-14 rounded-full border-4 border-[#f4f2ed]"
            src={
              userInfo.imageUrl
                ? userInfo.imageUrl
                : "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZmZoVDR2WDd3Q1pKU0FBUzBkSjFSdDRoSXgiLCJyaWQiOiJ1c2VyXzJnODE0eUxxWHBldTdTak42RENISGVYa1BWZCIsImluaXRpYWxzIjoiUFkifQ"
            }
            alt={userInfo.imageUrl}
            width={120}
            height={120}
          />
        </DialogTrigger>
        <DialogContent className="p-0 dark:bg-[var(--dark-post-background)]">
          <DialogHeader className="p-4 flex flex-row items-center gap-4">
            {addPhotoTab && (
              <Button
                onClick={() => setAddPhotoTab(false)}
                variant="ghost"
                className="p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </Button>
            )}
            <DialogTitle>
              {addPhotoTab ? "Change photo" : "Profile photo"}
            </DialogTitle>
          </DialogHeader>
          {addPhotoTab ? (
            <div className="flex flex-col gap-4 w-full">
              <input
                type="file"
                accept=".png, .jpg"
                ref={inputProfileImageRef}
                onChange={handleProfileImageSelect}
                style={{ display: "none" }}
              />
              <p className="text-center">
                {userInfo.firstName}, , help others recognize you!
              </p>
              {previewProfilePhoto ? (
                <img
                  src={previewProfilePhoto}
                  alt="preview"
                  className="w-[120px] h-[120px] object-cover mx-auto rounded-full"
                />
              ) : (
                <Image
                  className="w-[120px] h-[120px] object-cover mx-auto rounded-full"
                  src={
                    userInfo.imageUrl
                      ? userInfo.imageUrl
                      : "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZmZoVDR2WDd3Q1pKU0FBUzBkSjFSdDRoSXgiLCJyaWQiOiJ1c2VyXzJnODE0eUxxWHBldTdTak42RENISGVYa1BWZCIsImluaXRpYWxzIjoiUFkifQ"
                  }
                  alt={userInfo.imageUrl}
                  width={120}
                  height={120}
                />
              )}
              <div className="flex items-center justify-between dark:border-white/80 border-t p2-4 pb-2 px-4">
                <div className="flex items-center justify-end w-full gap-4 pt-2">
                  <Button
                    className="border-blue-600 rounded-full"
                    variant="ghost"
                  >
                    Use camera
                  </Button>
                  <Button
                    onClick={() => inputProfileImageRef.current.click()}
                    className="bg-blue-600 rounded-full text-white"
                    variant="ghost"
                  >
                    {previewProfilePhoto ? "Change photo" : " Upload photo"}
                  </Button>
                  {previewProfilePhoto && (
                    <Button
                      onClick={handleAddProfileImage}
                      className="rounded-full"
                    >
                      Save photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <Image
                className="w-[220px] h-[220px] object-cover mx-auto rounded-full"
                src={
                  userInfo.imageUrl
                    ? userInfo.imageUrl
                    : "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZmZoVDR2WDd3Q1pKU0FBUzBkSjFSdDRoSXgiLCJyaWQiOiJ1c2VyXzJnODE0eUxxWHBldTdTak42RENISGVYa1BWZCIsImluaXRpYWxzIjoiUFkifQ"
                }
                alt={userInfo.imageUrl}
                width={220}
                height={220}
              />
              <div className="flex items-center justify-between dark:border-white/80 border-t p2-4 pb-2 px-4">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" className="p-2 flex-col h-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    <p>edit</p>
                  </Button>
                  <Button
                    onClick={() => setAddPhotoTab(true)}
                    variant="ghost"
                    className="p-2 flex-col h-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                    <p>Add photo</p>
                  </Button>
                </div>
                <Button
                  onClick={handleRemoveProfileImage}
                  variant="ghost"
                  className="p-2 flex-col h-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <p>Delete</p>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfileImage;
