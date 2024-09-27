import React from "react";
import Image from "next/image";

const Notification = () => {

    const count = 6;

    return (
        <div className="relative flex items-center gap-1">
            <Image
                src="/assets/icons/bell.svg"
                width={22}
                height={22}
                className={`object-contain`} alt={''} />
            {count > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1 text-xs text-white">
                    {count}
                </span>
            )}
        </div>
    );
};

export default Notification;
