"use client";

import { apiClient } from "@/lib/api-client";
import { UPLOAD_POST_ROUTE } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";

const createPostAction = async (
  text: any,
  postImageFiles: any,
  token: any,
  revalidateData: any,
  setProgress: any
) => {
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Credentials", "true");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  if (postImageFiles) {
    for (let i = 0; i < postImageFiles.length; i++) {
      formdata.append(`posts-image`, postImageFiles[i]);
    }
  }
  // formdata.append("posts-image", profileImageFile);
  formdata.append("text", text);
  setProgress((prevState: any) => {
    return { ...prevState, started: true };
  });
  axios
    .post(UPLOAD_POST_ROUTE, formdata, {
      onUploadProgress: (progressEvent) => {
        setProgress((prevState: any) => {
          if (progressEvent.progress) {
            return { ...prevState, pc: progressEvent?.progress * 100 };
          }
        });
      },
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        revalidateData();
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message);
    })
    .finally(() =>
      setProgress((prevState: any) => {
        return { ...prevState, started: false, pc: 0 };
      })
    );
};

export default createPostAction;
