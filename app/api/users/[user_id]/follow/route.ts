import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  auth().protect();
  await connectDB();
  const { userId } = auth();

  try {
    const user = await request.json();
    const userRequest = {
      id: user.id,
    };
    console.log(userRequest);
  } catch (error) {
    return NextResponse.json({ message: "error on user request" });
  }

  if (!userId) {
    return NextResponse.json({ message: "user not athenticated" });
  }

  try {
    const followedUser = await Users.findById(params.user_id);

    if (!followedUser) {
      return NextResponse.json(
        { message: "user followed dosnt exist" },
        { status: 403 }
      );
    }

    await Users.findOneAndUpdate(
      { userId: userId },
      {
        $addToSet: {
          following: {
            emailAddress: followedUser.emailAddress,
            userId: followedUser.userId,
            firstName: followedUser.firstName,
            lastName: followedUser.lastName,
            imageUrl: followedUser.imageUrl,
          },
        },
      }
    );

    const currentUser = await Users.findOne({ userId: userId });
    return NextResponse.json({ type: "follow" }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
