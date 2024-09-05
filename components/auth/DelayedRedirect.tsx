'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DelayedRedirectProps {
    delay: number;
    redirectTo: string;
}

export default function DelayedRedirect({ delay, redirectTo }: DelayedRedirectProps) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(redirectTo);
        }, delay);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [delay, redirectTo, router]);

    return <div className='text-dark300_light700'>Syncing with database...</div>;
}
