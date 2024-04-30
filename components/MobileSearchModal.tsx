"use client";

import { SearchIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

function MobileSearchModal() {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  return (
    <div className="flex sm:hidden">
      <div
        className="icon flex sm:hidden"
        onClick={() => setOpenSearchBox(true)}
      >
        <SearchIcon className="h-6 md:h-5 text-gray-400" />
        <p className="hidden sm:inline-block">Search</p>
      </div>
      {openSearchBox && (
        <div className="absolute flex sm:hidden top-0 left-0 z-50 border-b p-2 bg-white w-full">
          <div
            className="icon flex sm:hidden"
            onClick={() => setOpenSearchBox(false)}
          >
            <XIcon className="h-6 md:h-5 text-gray-400" />
            <p className="hidden sm:inline-block">Search</p>
          </div>
          <div className="flex sm:hidden flex-1">
            <form className="flex items-center space-x-1 bg-gray-100 rounded-md flex-1 mx-2 max-w-96">
              <SearchIcon className="h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent flex-1 outline-none p-2"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileSearchModal;
