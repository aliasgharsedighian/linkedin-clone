import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  // auth().protect();
  await connectDB();
  // const { userId } = auth();
  const userReq = await request.json();
  //   const body = JSON.stringify(user);

  if (!userReq.userId) {
    return NextResponse.json({ message: "user not athenticated" });
  }

  try {
    const user = await Users.findById(params.user_id);
    if (!user) {
      return NextResponse.json(
        { message: "user doesn't exist" },
        { status: 403 }
      );
    }

    const updateUser = await Users.findOneAndUpdate(
      { userId: userReq.userId },
      {
        pushNotficationToken: userReq.pushNotficationToken,
      }
    );

    const updatedUser = await Users.findById(params.user_id);

    return NextResponse.json(
      //   { message: "user token for push notfication saved succsessfully" },
      {
        message: "user token for push notfication saved successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
