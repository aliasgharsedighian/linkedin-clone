"use client";

import { apiClient } from "@/lib/api-client";
import { UPLOAD_POST_ROUTE } from "@/utils/constants";

const createPostAction = async (
  text: any,
  profileImageFile: any,
  token: any,
  revalidateData: any
) => {
  // const postInput = formData.get("postInput") as string;
  // const image = formData.get("image") as File;
  // let config = {
  //   headers: {
  //     "Access-Control-Allow-Credentials": true,
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // let body = {
  //   text: postInput,
  //   "posts-image": profileImageFile,
  // };
  // const { data, status } = await apiClient.post(
  //   UPLOAD_POST_ROUTE,
  //   body,
  //   config
  // );
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("posts-image", profileImageFile);
  // formdata.append("userId", userId);
  formdata.append("text", text);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}api/posts/upload-post`,
    {
      method: "POST",
      body: formdata,
      headers: myHeaders,
    }
  );
  const res = await response.json();

  if (res.status === 200) {
    revalidateData();
    // console.log(res);
  }
};

export default createPostAction;
