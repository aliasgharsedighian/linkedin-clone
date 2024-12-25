"use client";

import { apiClient } from "@/lib/api-client";
import { REMOVE_POST_ROUTE } from "@/utils/constants";

const deletePostAction = async (
  postId: any,
  token: any,
  revalidateData: any
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    postId: postId,
  });

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    //   redirect: "follow",
  };

  fetch(REMOVE_POST_ROUTE, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if (result.status === 200) {
        revalidateData();
      }
    })
    .catch((error) => console.error(error));
};

export default deletePostAction;
