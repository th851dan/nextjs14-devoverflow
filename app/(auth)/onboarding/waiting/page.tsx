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
  console.log("waiting is called" + Date.now());
  useEffect(() => {
    console.log("useEffect is called");
    const interval = setInterval(
      async () => {
        const isCreated = await checkUserCreatedStatus(userId);
        if (isCreated) {
          console.log("User exists in DB");
        } else {
          console.log("User does not exist in DB");
        }
        if (isCreated) {
          clearInterval(interval);
          console.log("Redirecting to onboarding...");
          router.push("/onboarding");
          router.refresh();
        }
      },
      parseInt(process.env.NEXT_PUBLIC_TIME_CHECK_USER_EXIST_IN_DB ?? "5000")
    ); // Check every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return <div>Waiting for your account to be set up...</div>;
};

export default Page;
