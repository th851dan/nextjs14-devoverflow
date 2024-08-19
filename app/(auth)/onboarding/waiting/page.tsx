"use client";
import { useEffect, useState } from "react";
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
  const [isUserCreated, setUserCreated] = useState(false);

  useEffect(() => {
    const timeout = setInterval(async () => {
      const isCreated = await checkUserCreatedStatus(userId);
      if (isCreated) {
        console.log("Yeah");
      } else {
        console.log("No Why");
      }
      if (isCreated) {
        setUserCreated(true);
        clearInterval(timeout);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(timeout); // Clean up interval on unmount
  }, [router]);

  useEffect(() => {
    if (isUserCreated) {
      console.log("Redirecting to onboarding...");
      router.push("/onboarding");
    }
  }, [isUserCreated]);

  return <div>Waiting for your account to be set up...</div>;
};

export default Page;
