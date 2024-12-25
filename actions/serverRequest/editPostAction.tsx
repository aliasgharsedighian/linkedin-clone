"use client";

import { apiClient } from "@/lib/api-client";
import { EDIT_POST_ROUTE } from "@/utils/constants";

const editPostAction = async (
  postId: any,
  editedText: any,
  token: any,
  revalidateData: any
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    editedText,
    postId,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    //   redirect: "follow",
  };

  fetch(EDIT_POST_ROUTE, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if (result.status === 200) {
        revalidateData();
      }
    })
    .catch((error) => console.error(error));
};

export default editPostAction;
