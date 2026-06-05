"use client";

import MessageCard from "@/src/components/common/MessageCard";
import { useProgress } from "@/src/components/layout/ProgressContext";
import { screenedOutMessage, thankyouMessage } from "@/src/config/messageConfig";
import { getStepOffset } from "@/src/config/progressConfig";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ThankYouContent() {
    const { setCurrentStep } = useProgress();
    const searchParams = useSearchParams();
    const screenedOut = searchParams.get("screened") === "1";

    useEffect(() => {
        setCurrentStep(getStepOffset("thankyou") + 1);
    }, []);

    return (
        <MessageCard>
            <span className="text-5xl">{screenedOut ? "👋" : "✅"}</span>
            {screenedOut ? screenedOutMessage : thankyouMessage}
        </MessageCard>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense>
            <ThankYouContent />
        </Suspense>
    );
}
