"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { useAppStore } from "@/store/store";
import { useEffect, useState } from "react";

export function SignedInProvider({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const [access, setAccess] = useState(false);
  // const { data } = useUserInfo();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, [userInfo]);

  if (!access) {
    return;
  }

  return children;
}
