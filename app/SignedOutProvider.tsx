"use client";

import { useAppStore } from "@/store/store";
import { useEffect, useState } from "react";

export function SignedOutProvider({ children }: { children: React.ReactNode }) {
  const [access, setAccess] = useState(false);
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (userInfo) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, [userInfo]);

  if (access) {
    return;
  }

  return children;
}
