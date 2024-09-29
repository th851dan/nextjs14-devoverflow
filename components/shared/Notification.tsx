"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getNotificationByRecipient } from "@/lib/actions/notification.action";

const ShowNotification = (recipientId: string) => {

    const [notifcation, setNotification] = useState<Notification[]>([]);

    useEffect(() => {

        async function fetchNotifications() {
            const res = await getNotificationByRecipient({ recipientId })
            setNotification(res);
        }
        fetchNotifications();

    }, [notifcation, recipientId])

    return (
        <div className="relative flex items-center gap-1">
            <Image
                src="/assets/icons/bell.svg"
                width={22}
                height={22}
                className={`object-contain`} alt={''} />
            {notifcation.length > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1 text-xs text-white">
                    {notifcation.length}
                </span>
            )}
        </div>
    );
};

export default ShowNotification;
