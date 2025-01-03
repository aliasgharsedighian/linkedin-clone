"use client";

import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store/store";
import { UserInfoType } from "@/typing";
import { PROFILE_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";

let cachedUserInfo: null | UserInfoType = null;

const useUserInfo = () => {
  const [data, setData] = useState(cachedUserInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { userInfo, setUserInfo } = useAppStore();
  let activity: string | null = "view";

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get(PROFILE_ROUTE, {
        withCredentials: true,
      });
      if (!response) {
        // handle error
      }
      // console.log(response.data.data);
      if (response.status === 200) {
        setData(response.data.data);
        setUserInfo(response.data.data);
        cachedUserInfo = response.data.data; // Update cache
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    activity = localStorage.getItem("activity");
    if (!data && activity === "user") {
      fetchUserInfo();
    } else {
      setLoading(false);
      // console.log(userInfo);
    }
  }, []);

  return { data, loading, error, setData };
};

export default useUserInfo;
