'use client';

import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { useRouter } from '@i18n/routing';

interface UserDataProps {
  clerkId: string;
}

export default function UserData({ clerkId }: UserDataProps) {
  const router = useRouter(); // Use Next.js router to refresh the page

  useEffect(() => {
    // Initialize Pusher client with TypeScript types
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('user-channel');

    // Listen for the 'user-created' event
    channel.bind('user-created', (data: { clerkId: string }) => {
      if (data.clerkId === clerkId) {
        // Refresh the page to re-fetch the Server Component data
        router.refresh(); // This will trigger the server component to re-fetch user data
      }
    });

    // Cleanup Pusher subscription on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [clerkId, router]);

  return null; // No UI is needed for this component
}
