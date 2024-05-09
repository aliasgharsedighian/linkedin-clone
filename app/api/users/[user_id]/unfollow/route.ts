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
  const user = await request.json();
  const userRequest = {
    id: user.id,
  };

  if (!userId) {
    return NextResponse.json({ message: "user not athenticated" });
  }
  const followedUser = await Users.findById(params.user_id);

  if (!followedUser) {
    throw new Error("user followed dosnt exist");
  }

  try {
    // console.log(userId);
    await Users.findOneAndUpdate(
      { userId: userId },
      {
        $pull: {
          following: {
            userId: userRequest.id,
          },
        },
      }
    );

    return NextResponse.json({ type: "unfollow" }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
