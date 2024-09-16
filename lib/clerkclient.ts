"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { DeleteUserParams, UpdateUserParams } from "./actions/shared.types";



export async function deleteUserWithClerkClient(params: DeleteUserParams) {
    await clerkClient.users.deleteUser(params.clerkId);
}

export async function getUserListApi(params: {
  limit: number;
  offset: number;
}) {
  // Get the Bearer token from environment variables
  try {
    const response = await fetch(
      `https://api.clerk.com/v1/users?limit${params.limit}&offset=${params.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status indicates an error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${errorData.error || "Failed to fetch users"}`
      );
    }

    // Parse the response as JSON
    const data = await response.json();

    return data;
  } catch (error: any) {
    // Error handling
    console.error("Error fetching users from Clerk API:", error.message);
    throw error;
  }
}


export async function updateUserWithClerkClient(params: UpdateUserParams) {
   console.log("clerk update")
   console.log(params)
   await clerkClient.users.updateUser(params.clerkId, params.updateData);
}