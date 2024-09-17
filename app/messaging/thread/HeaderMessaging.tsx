"use client";

import { SearchIcon, X } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import HeadMessagingButton from "./HeadMessagingButton";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/lib/api-client";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

function HeaderMessaging({ userId }: any) {
  const formRef = useRef<any>();
  const { showMessage, setShowMessage } = useAppStore();
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let handler: any = (e: FormEvent<HTMLDivElement>) => {
      if (formRef?.current && !formRef.current.contains(e.target)) {
        setSearchContacts([]);
        setSearchInput("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [formRef, setSearchContacts]);

  const searchContact = useDebouncedCallback(
    async (searchTerm: string | null) => {
      try {
        if (searchInput.length > 0) {
          const response = await apiClient.post(
            `${process.env.SERVER_ADDRESS}api/contacts/search`,
            { searchTerm, userId }
          );
          // console.log(response.data.data);
          if (response.status === 200 && response.data.data) {
            setSearchContacts(response.data.data);
          } else {
            setSearchContacts([]);
          }
        } else {
          setSearchContacts([]);
        }
      } catch (error) {
        console.log({ error });
      }
    },
    1000
  );

  return (
    <div className="sticky md:static top-[67px] flex items-center justify-between gap-4 px-4 pt-3 pb-1 border-b dark:border-[var(--dark-border)] bg-white dark:bg-zinc-800 z-10 rounded-t-md">
      <div className="flex items-center gap-4">
        {showMessage && (
          <Button
            onClick={() => setShowMessage(false)}
            variant="ghost"
            className="p-0 m-0 flex md:hidden"
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

        <p className="font-bold">Messaging</p>
        <form
          ref={formRef}
          className="hidden relative sm:flex items-center space-x-1 bg-[#edf3f8] dark:bg-[var(--dark-post-background)] dark:border dark:border-[var(--dark-border)] px-2 py-1 rounded-sm"
        >
          <SearchIcon className="h-4 text-gray-400" />
          <input
            type="text"
            name="search-message"
            id="search-message"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchContact(e.target.value);
            }}
            placeholder="search messages"
            className="bg-transparent flex-1 outline-none dark:bg-[var(--dark-post-background)] dark:text-white placeholder:text-sm"
          />
          {searchInput && (
            <X
              onClick={() => {
                setSearchInput("");
                setSearchContacts([]);
              }}
              className="h-4 text-gray-400 cursor-pointer"
            />
          )}
          <div className="absolute min-w-fit bg-white dark:bg-[var(--dark-post-background)] w-full p-0 left-0 right-0 top-10 shadow-lg border dark:border-[var(--dark-border)] rounded-b-md">
            {searchContacts.map((item: any) => (
              <Link
                onClick={() => {
                  setSearchContacts([]);
                  setSearchInput("");
                }}
                key={item.userId}
                className="w-full flex items-start gap-4 hover:font-bold hover:bg-slate-100 dark:hover:bg-slate-600 py-2 border-b last:border-none px-2 cursor-pointer"
                href={`/messaging/thread/${`s`}`}
              >
                <Avatar>
                  <AvatarImage src={item?.imageUrl} />
                  <AvatarFallback>{item?.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">
                    {item.firstName} {item.lastName}
                  </p>
                  <p className="break-words text-[12px]">{item.emailAddress}</p>
                </div>
              </Link>
            ))}
          </div>
        </form>
      </div>
      <HeadMessagingButton setShowMessage={setShowMessage} />
    </div>
  );
}

export default HeaderMessaging;
