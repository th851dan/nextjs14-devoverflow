"use client";

import React from 'react';
import Image from "next/image";
import { toast } from '../ui/use-toast';

interface CopyProps {
    link: string;
}

const CopyClipBoard = ({ link }: CopyProps) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                toast({
                    title: `Link copied to clipboard🎉`,
                    variant: "default",
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast({
                    title: `Error copying link to clipboard ⚠️`,
                    variant: "destructive",
                });
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
