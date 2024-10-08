/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

import Pusher from 'pusher';

// Initialize Pusher with TypeScript types
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log("user create webhook");
    console.log(evt.data)
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const parts = email_addresses[0].email_address.split("@");

    // create a new user in database
    const mongoUser = await createUser({
      clerkId: id,
      username: username || `${parts[0]}-${parts[1].split(".")[0]}`,
      email_addresses: email_addresses.map(
        (emailJSON) => emailJSON.email_address
      ),
      first_name: first_name || "",
      last_name: last_name || "",
      image_url,
      picture: image_url,
    });

    // Emit the userCreated event to Pusher
    await pusher.trigger('user-channel', 'user-created', { clerkId: id });
    return NextResponse.json({ message: "User created", mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username } = evt.data;

    // create a new user in database
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        username: username!,
        email_addresses: email_addresses.map(
          (emailJSON) => emailJSON.email_address
        ),
        picture: image_url,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: "User updated", user: mongoUser });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser({
      clerkId: id!,
    });

    return NextResponse.json({ message: "User deleted", user: deletedUser });
  }

  return new Response("", { status: 201 });
}
