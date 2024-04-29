"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/Post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("image") as File;
  let image_url: string | undefined = undefined;

  if (!postInput) {
    throw new Error("Post input is required");
  }

  //define user
  const userDB: IUser = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };
  try {
    if (image.size > 0) {
      //1.upload image if there is one

      const timestamp = new Date().getTime();
      const file_name = `${randomUUID()}_${timestamp}.png`;

      const imageBuffer: any = await image.arrayBuffer();

      const formdata = new FormData();
      formdata.append("key", "700a99941c1160d98138d5e03458c711");
      formdata.append("image", imageBuffer);

      const requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("https://api.imgbb.com/1/upload", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          image_url = result.data.url;
        })
        .catch((error) => console.error(error));

      //2.create post in database with image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        imageUrl: "https://i.ibb.co/0Xbbbzz/OIG.jpg",
      };

      await Post.create(body);
    } else {
      //1. create post in database without image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (error: any) {
    throw new Error("Failed to create post", error);
  }

  //revalidatePath "/" - home page
}
