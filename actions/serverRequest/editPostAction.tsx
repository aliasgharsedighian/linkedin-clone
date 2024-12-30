"use client";

import { apiClient } from "@/lib/api-client";
import { EDIT_POST_ROUTE } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";

const editPostAction = async (
  postId: any,
  editedText: any,
  postImageFiles: any,
  removeFiles: any,
  token: any,
  setProgress: any,
  revalidateData: any
) => {
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  if (postImageFiles) {
    for (let i = 0; i < postImageFiles.length; i++) {
      formdata.append(`posts-image`, postImageFiles[i]);
    }
  }
  formdata.append("editedText", editedText);
  formdata.append("postId", postId);
  if (removeFiles?.length) {
    for (let j = 0; j < removeFiles.length; j++) {
      formdata.append(`removeFiles[${j}]`, removeFiles[j]);
    }
  }

  // const raw = JSON.stringify({
  //   editedText,
  //   postId,
  // });

  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   //   redirect: "follow",
  // };

  // fetch(EDIT_POST_ROUTE, requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     // console.log(result);
  //     if (result.status === 200) {
  //       revalidateData();
  //     }
  //   })
  //   .catch((error) => console.error(error));

  axios
    .post(EDIT_POST_ROUTE, formdata, {
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

export default editPostAction;
