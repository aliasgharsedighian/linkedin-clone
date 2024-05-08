"use client";

import { Edit2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface PageProps {
  firstName: string;
  lastName: string;
  id: any;
  headline: string;
  currentPosition: string;
  country: string;
  city: string;
  user_id: string;
}

function UserPageUserInfo({
  firstName,
  lastName,
  id,
  headline,
  currentPosition,
  country,
  city,
  user_id,
}: PageProps) {
  const handleFollowUser = async () => {
    const promise = await fetch(`/api/users/${id}`, {
      method: "POST",
      body: JSON.stringify({
        id: user_id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await promise.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-2 mx-6">
      <div className="flex justify-end">
        <Button
          onClick={() => handleFollowUser()}
          variant="ghost"
          className="text-sm text-white bg-sky-600 hover:bg-sky-700 hover:text-white"
        >
          Follow
        </Button>
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

export default UserPageUserInfo;
