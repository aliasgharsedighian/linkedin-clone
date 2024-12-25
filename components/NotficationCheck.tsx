"use client";

import useFcmToken from "@/hooks/useFcmToken";
import React, { useEffect } from "react";

function NotficationCheck({ userInfo }: any) {
  const { token, notificationPermissionStatus } = useFcmToken();

  async function sendNotficationTokenToDatabase() {
    const promise = await fetch(`/api/users/${userInfo.id}/notfication-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        pushNotficationToken: token,
        userId: userInfo.userId,
      }),
    });

    const data = await promise.json();
    // console.log(data);
  }

  useEffect(() => {
    if (token) {
      sendNotficationTokenToDatabase();
    }
  }, [token]);

  if (!("Notification" in window)) {
    // console.info("This browser does not support desktop notification");
    return (
      <div>
        <p>This browser does not support desktop notification</p>
      </div>
    );
  }

  return null;
}

export default NotficationCheck;
