"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store/store";
import { X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchContacts({ userId }: any) {
  const formRef = useRef<any>();
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { setSelectedChatData, setSelectedChatType } = useAppStore();

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

  const selectedNewContact = (contact: any) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchContacts([]);
    setSearchInput("");
  };

  return (
    <div
      ref={formRef}
      className="relative py-1 px-3 border-b dark:border-[var(--dark-border)]"
    >
      <Input
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          searchContact(e.target.value);
        }}
        className="py-1 px-3 h-auto rounded-full"
        placeholder="type a name or multiple names"
      />
      {searchInput && (
        <X
          onClick={() => {
            setSearchInput("");
            setSearchContacts([]);
          }}
          className="absolute right-4 top-2.5 h-4 text-gray-400 cursor-pointer"
        />
      )}
      <div className="absolute min-w-fit bg-white dark:bg-[var(--dark-post-background)] w-full p-0 left-0 right-0 top-10 shadow-lg border dark:border-[var(--dark-border)] rounded-b-md z-50">
        {searchContacts.map((item: any) => (
          <div
            onClick={() => {
              selectedNewContact(item);
            }}
            key={item.userId}
            className="w-full flex items-start gap-4 hover:font-bold hover:bg-slate-100 dark:hover:bg-slate-600 py-2 border-b last:border-none px-2 cursor-pointer"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchContacts;
