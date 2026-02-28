"use client";

import MessageCard from "@/src/components/common/MessageCard";
import { useProgress } from "@/src/components/layout/ProgressContext";
import { thankyouMessage } from "@/src/config/messageConfig";
import { getStepOffset } from "@/src/config/progressConfig";
import { useEffect } from "react";

export default function ThankYouPage() {
    const { setCurrentStep } = useProgress();

    useEffect(() => {
        setCurrentStep(getStepOffset("thankyou") + 1);
    }, []);

    return (
        <MessageCard>
            <span className="text-5xl">✅</span>
            {thankyouMessage}
        </MessageCard>
    );

}