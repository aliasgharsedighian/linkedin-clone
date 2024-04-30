"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

function MobileUserInformationExpand({ userPosts, userComments }: any) {
  const [expandInfo, setExpandInfo] = useState(true);

  return (
    <div className="w-full flex flex-col md:hidden mt-4">
      <Button
        className="flex gap-1 items-center"
        variant="ghost"
        onClick={() => setExpandInfo(!expandInfo)}
      >
        show more
        <ChevronUp
          className={`transition-all duration-200 ${
            expandInfo ? "" : "rotate-180"
          }`}
        />
      </Button>
      {expandInfo && (
        <div className="w-full flex flex-col">
          <hr className="w-full border-gray-200 my-5" />

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Posts</p>
            <p className="text-blue-400">{userPosts.length}</p>
          </div>

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Comments</p>
            <p className="text-blue-400">{userComments.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileUserInformationExpand;
