import { clerkClient } from "@clerk/nextjs/server";
import { DeleteUserParams } from "./actions/shared.types";



export async function deleteUserWithClerkClient(params: DeleteUserParams) {
    await clerkClient.users.deleteUser(params.clerkId);
}

