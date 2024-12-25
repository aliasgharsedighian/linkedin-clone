"use client";

import { apiClient } from "@/lib/api-client";
import { COMMENT_ON_POST_ROUTE } from "@/utils/constants";

const createCommentAction = async (
  formData: any,
  postId: any,
  token: any,
  revalidateData: any
) => {
  const commentInput = formData.get("commentInput") as string;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    text: commentInput,
    postId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    //   redirect: "follow",
  };

  fetch(COMMENT_ON_POST_ROUTE, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if (result.status === 200) {
        revalidateData();
      }
    })
    .catch((error) => console.error(error));
};

export default createCommentAction;
