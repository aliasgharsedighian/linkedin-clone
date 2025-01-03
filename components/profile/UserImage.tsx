"use client";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function UserImage({ userInfo }: { userInfo: any }) {
  const path = usePathname();

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
      <Image
        className="w-[120px] h-[120px] object-cover mx-8 absolute top-14 rounded-full border-4 border-[#f4f2ed]"
        src={
          userInfo?.imageUrl
            ? userInfo?.imageUrl
            : "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZmZoVDR2WDd3Q1pKU0FBUzBkSjFSdDRoSXgiLCJyaWQiOiJ1c2VyXzJnODE0eUxxWHBldTdTak42RENISGVYa1BWZCIsImluaXRpYWxzIjoiUFkifQ"
        }
        alt={
          `profile-pic for $${userInfo?.firstName} ${userInfo?.lastName}` ||
          "profile-pic"
        }
        width={120}
        height={120}
      />
    </div>
  );
}

export default UserImage;
