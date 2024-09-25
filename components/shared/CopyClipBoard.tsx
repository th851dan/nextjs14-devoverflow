"use client";

import React from 'react';
import Image from "next/image";

interface CopyProps {
    link: string;
}

const CopyClipBoard = ({ link }: CopyProps) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                alert('Link copied');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <button
            onClick={copyToClipboard}
            className="flex-center gap-1"
        >
            <Image
                src="/assets/icons/forward.svg"
                width={16}
                height={16}
                className={`object-contain`} alt={''} />
            <span className="small-medium text-dark400_light800">Share</span>
        </button>
    );
};

export default CopyClipBoard;
