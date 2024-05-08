import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  await connectDB();

  try {
    const user = await Users.findById(params.user_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
