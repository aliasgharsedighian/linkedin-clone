"use client";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function UserImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative">
      <div className="bg-slate-700 h-32 w-full">
        <div className="w-full flex justify-end">
          <div className="bg-white rounded-full m-4 p-2.5">
            <CameraIcon size={20} className="  fill-sky-600 text-white" />
          </div>
        </div>
      </div>
      <Image
        className="w-[120px] h-[120px] object-cover mx-8 absolute top-14 rounded-full border-4 border-[#f4f2ed]"
        src={imageUrl}
        alt={imageUrl}
        width={120}
        height={120}
      />
    </div>
  );
}

export default UserImage;
