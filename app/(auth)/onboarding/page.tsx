import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Profile from "@/components/forms/Profile";

import { getUserById } from "@/lib/actions/user.action";
import { ClerkId } from "@/lib/actions/shared.types";

const getMongoUser = async ({ clerkId }: ClerkId) => {
  try {
    return await getUserById({ userId: clerkId });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null if there's an error
  }
};

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getMongoUser({ clerkId: userId });
  if (!mongoUser) {
    return redirect("/onboarding/waiting"); // Redirect if user not found
  }

  if (mongoUser.onboarded) {
    return redirect("/"); // Redirect if user is already onboarded
  }

  return (
    <>
      <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="h1-bold text-dark100_light900">Onboarding</h1>
        <p className="base-medium text-dark100_light900 mt-3">
          Complete your profile now to use BuddyKnows
        </p>

        <div className="background-light850_dark100 mt-9 p-10">
          <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
        </div>
      </main>
    </>
  );
};

export default Page;
