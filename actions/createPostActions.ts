"use server";

import { AddPostRequestBody } from "@/app/api/posts/route";
import { Post } from "@/mongodb/models/Post";
import { IUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function createPostAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  let user = undefined;

  const fetchUserIdByToken: any = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}api/auth/user-info-bearer`,
      {
        cache: "no-cache",
        headers: myHeaders,
      }
    );
    const data = await res.json();
    return data.data;
  };
  const userClerk = await currentUser();
  user = userClerk;
  // || fetchUserIdByToken();

  if (!user) {
    user = await fetchUserIdByToken();
    // throw new Error("User not authenticated");
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

      const formData = new FormData();
      formData.append("key", "e5e2ca7c62d7a5e496621a919b1848f5");
      formData.append("image", image);

      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data: any = await res.json();

      image_url = data.data.url;

      //2.create post in database with image
      const body: AddPostRequestBody = {
        user: userDB,
        text: postInput,
        ...(image_url && { image_url }),
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

  revalidatePath("/");
}
