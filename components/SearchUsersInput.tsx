"use client";

import { SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchUsersInput() {
  const [searchInput, setSearchInput] = useState("");
  const [openSuggest, setOpenSuggest] = React.useState(true);
  const [suggestionData, setSuggestionData] = useState<any>([]);
  const [suggestionLink, setSuggestionLink] = useState(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    sendValueToApi(e.target.value);
  };

  const sendValueToApi = useDebouncedCallback(async (text) => {
    setOpenSuggest(true);
    if (text !== "") {
      setSuggestionLink(false);
      setSuggestionData([
        ...suggestionData,
        {
          name: "searching...",
        },
      ]);
      try {
        const body = {
          searchInput,
        };

        const res = await fetch(`/api/users/search_user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const result = await res.json();
        // console.log(result);
        if (result.status === 200) {
          if (result.data.length > 0) {
            setSuggestionLink(true);
            setSuggestionData(
              result.data.map((item: any) => ({
                user_id: item.user_id,
                name: item.name,
                email: item.email,
                image: item.image,
              }))
            );
          }
          if (result.data.length === 0) {
            setSuggestionLink(false);
            setSuggestionData([
              {
                user_id: "",
                name: result.message,
              },
            ]);
          }
        }
      } catch (error) {
        setSuggestionData([]);
      }
    }
    if (text === "") {
      setSuggestionData([]);
    }
  }, 1000);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex items-center space-x-1 bg-[#edf3f8] dark:bg-[var(--dark-post-background)] dark:border dark:border-[var(--dark-border)] p-2 rounded-md flex-1 mx-2 max-w-96"
    >
      <SearchIcon className="h-4 text-gray-400" />
      <input
        value={searchInput}
        onChange={handleSearchInput}
        type="text"
        placeholder="Search"
        className="bg-transparent flex-1 outline-none dark:bg-[var(--dark-post-background)] dark:text-white"
      />
      {searchInput && (
        <X
          onClick={() => {
            sendValueToApi("");
            setSuggestionData([]);
            setSearchInput("");
          }}
          className="h-4 text-gray-400 cursor-pointer"
        />
      )}
      <div className="absolute min-w-fit bg-white w-full p-0 left-0 right-0 top-10 shadow-lg">
        <div className="w-full flex flex-col">
          {openSuggest ? (
            suggestionData.length > 0 ? (
              <div className="w-full flex flex-col">
                {suggestionData.length > 0
                  ? suggestionData.map((framework: any) =>
                      suggestionLink ? (
                        <Link
                          className="w-full flex items-start gap-4 hover:font-IRANSansBold hover:bg-slate-100 py-2 border-b last:border-none px-2"
                          key={framework.user_id}
                          href={`/user/${framework.user_id}`}
                          onClick={() => setOpenSuggest(false)}
                        >
                          <Avatar>
                            <AvatarImage src={framework?.image} />
                            <AvatarFallback>
                              {framework?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm">
                              {framework.name}
                            </p>
                            <p className="break-words text-[12px]">
                              {framework.email}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <p
                          className="w-full py-2 border-b last:border-none px-4"
                          key={framework.name}
                          onClick={() => setOpenSuggest(false)}
                        >
                          {framework.name}
                        </p>
                      )
                    )
                  : null}
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default SearchUsersInput;