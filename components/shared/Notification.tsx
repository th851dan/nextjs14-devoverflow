"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { countQuestion } from "@/lib/actions/question.action";

const Notification = () => {

    const [questionNumber, setQuestionNumber] = useState<number>(0);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const question = await countQuestion()
                setQuestionNumber(question);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 900000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex items-center gap-1">
            <Image
                src="/assets/icons/bell.svg"
                width={22}
                height={22}
                className={`object-contain`} alt={''} />
            {questionNumber > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1 text-xs text-white">
                    {questionNumber}
                </span>
            )}
        </div>
    );
};

export default Notification;
