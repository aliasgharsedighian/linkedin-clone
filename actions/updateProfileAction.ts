"use server";

import { Users } from "@/mongodb/models/users";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function updateProfileAction(
  userId: string,
  formData: FormData
) {
  const user = await currentUser();
  const firstName = formData.get("firstNameInput");
  const lastName = formData.get("lastNameInput");
  const headline = formData.get("headlineInput");
  const currentPosition = formData.get("currentPositionInput");

  if (!user?.id) {
    throw new Error("User not authenticated");
  }
  const userProfile = await Users.findById(userId);

  if (!userProfile) {
    throw new Error("user not found");
  }

  if (userProfile.userId !== user.id) {
    throw new Error("profile does not blong to the user");
  }

  try {
    const bodySendToMongodb = {
      firstName,
      lastName,
      headline,
      currentPosition,
    };
    revalidatePath("/profile");
  } catch (error) {
    throw new Error(`An error occurred while updating the profile`);
  }
}
