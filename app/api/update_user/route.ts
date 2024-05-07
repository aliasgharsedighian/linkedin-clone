import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/mongodb/db";
import { Users } from "@/mongodb/models/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  // console.log("test webhook");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent | any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id, image_url, last_name, first_name, created_at, email_addresses } =
    evt.data;
  const eventType = evt.type;
  const bodySendToMongodb = {
    created_at: created_at,
    firstName: first_name,
    userId: id,
    imageUrl: image_url,
    lastName: last_name,
    emailAddress: email_addresses[0].email_address,
  };

  await connectDB();

  const user = await Users.findOne({ userId: id });
  if (user) {
    // console.log("user Exist");
    const updateUser = await Users.findOneAndUpdate(
      { userId: id },
      bodySendToMongodb
    );
    return NextResponse.json({
      message: "update user successfully",
      updateUser,
    });
  }

  // console.log("user not exist");
  const createUser = await Users.create(bodySendToMongodb);
  // console.log("User created successfully");
  return NextResponse.json({
    message: "User created successfully",
    createUser,
  });
}
