"use client";

import { REMOVE_COMMENT_ROUTE } from "@/utils/constants";

const deleteCommentAction = async (
  commentId: any,
  token: any,
  revalidateData: any
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    commentId: commentId,
  });

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    //   redirect: "follow",
  };

  fetch(REMOVE_COMMENT_ROUTE, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result);
      if (result.status === 200) {
        revalidateData();
      }
    })
    .catch((error) => console.error(error));
};

export default deleteCommentAction;
