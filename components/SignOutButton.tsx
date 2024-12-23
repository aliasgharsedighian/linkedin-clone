"use client";

import React from "react";
import { Button } from "./ui/button";
import { apiClient } from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { toast } from "sonner";
import { useAppStore } from "@/store/store";

function SignOutButton() {
  const { setUserInfo } = useAppStore();

  const signOutButton = async () => {
    const { data } = await apiClient.get(LOGOUT_ROUTE, {
      withCredentials: true,
    });
    if (data.status === 200) {
      toast.success(data.message);
      setUserInfo(undefined);
      localStorage.setItem("activity", "view");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <Button onClick={signOutButton} className="w-full" variant="default">
      Sign Out
    </Button>
  );
}

export default SignOutButton;
