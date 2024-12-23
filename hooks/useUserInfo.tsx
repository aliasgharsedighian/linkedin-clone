"use client";

import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store/store";
import { PROFILE_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useUserInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { userInfo, setUserInfo } = useAppStore();
  const activity = localStorage.getItem("activity");

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get(PROFILE_ROUTE, {
        withCredentials: true,
      });
      if (!response) {
        // handle error
      }
      console.log(response.data.data);
      if (response.status === 200) {
        setData(response.data.data);
        setUserInfo(response.data.data);
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
    if (!userInfo && activity === "user") {
      fetchUserInfo();
    } else {
      setLoading(false);
      // console.log(userInfo);
    }
  }, [userInfo, setUserInfo]);

  return { data, loading, error };
};

export default useUserInfo;
