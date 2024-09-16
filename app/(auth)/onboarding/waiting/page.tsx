"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const checkUserCreatedStatus = async (userId: any) => {
  // Call an API endpoint to check if the user has been created in db
  const response = await fetch(`/api/db/checkUserCreated?userId=${userId}`);
  const { created } = await response.json();
  return created;
};

const Page = () => {
  const router = useRouter();
  const { userId } = useAuth();
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const isCreated = await checkUserCreatedStatus(userId);

        if (isCreated) {
          clearInterval(interval);
          router.push("/onboarding");
          router.refresh();
        }
      },
      parseInt(process.env.NEXT_PUBLIC_TIME_CHECK_USER_EXIST_IN_DB ?? "2000")
    ); // Check every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [userId]);

  return (
    <div className="text-dark-100 dark:text-light-900">
      Waiting for your account to be set up...
    </div>
  );
};

export default Page;
