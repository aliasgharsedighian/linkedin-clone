"use server";

import { Users } from "@/mongodb/models/users";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

export default async function updateProfileAction(
  userId: string,
  formData: FormData
) {
  const user = await currentUser();
  const firstName = formData.get("firstNameInput");
  const lastName = formData.get("lastNameInput");
  const headline = formData.get("headlineInput");
  const currentPosition = formData.get("currentPositionInput");
  const country = formData.get("countryInput");
  const city = formData.get("cityInput");

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
    const extendData = {
      headline,
      currentPosition,
      country,
      city,
    };

    // const test = await Users.findOne({ _id: new ObjectId(userId) });
    // console.log(test);

    const test = await Users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { firstName, lastName, extendData } }
    );
    revalidatePath("/profile");
  } catch (error) {
    throw new Error(`An error occurred while updating the profile`);
  }
}
