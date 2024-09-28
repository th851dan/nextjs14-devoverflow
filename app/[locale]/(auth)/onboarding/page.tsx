import { auth } from "@clerk/nextjs/server";
import { redirect } from "@i18n/routing";

import Profile from "@components/forms/Profile";

import { getUserById } from "@lib/actions/user.action";
import { ClerkId } from "@lib/actions/shared.types";
import UserData from "@/components/auth/UserData";

const getMongoUser = async ({ clerkId }: ClerkId) => {
  try {
    return await getUserById({ userId: clerkId });
  } catch (error) {
    console.error("Error fetching user");
    return null; // Return null if there's an error
  }
};

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getMongoUser({ clerkId: userId });

  if (!mongoUser) {
    return (
      <div>
        <p className="text-dark100_light900">Creating your account, please wait...</p>
        {/* Client Component to handle Pusher real-time updates */}
        <UserData clerkId={userId} />
      </div>
    );
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

        <div className="background-light850_dark100 mt-9 p-10 rounded-2xl border border-primary-100 opacity-75">
          <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
        </div>
      </main>
    </>
  );
};

export default Page;
