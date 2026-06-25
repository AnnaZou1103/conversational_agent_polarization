"use client";

import MessageCard from "@/src/components/common/MessageCard";
import { useProgress } from "@/src/components/layout/ProgressContext";
import { cloudResearchRedirectUrls, screenedOutMessage, thankyouMessage } from "@/src/config/messageConfig";
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

    const redirectUrl = screenedOut ? cloudResearchRedirectUrls.screenedOut : cloudResearchRedirectUrls.completed;

    return (
        <MessageCard>
            <span className="text-5xl">{screenedOut ? "👋" : "✅"}</span>
            {screenedOut ? screenedOutMessage : thankyouMessage}
            <a
                href={redirectUrl}
                className="inline-flex items-center justify-center px-8 h-14 bg-[#2563EB] hover:bg-blue-700 cursor-pointer text-white text-lg font-semibold rounded-lg transition-colors"
            >
                Continue to CloudResearch
            </a>
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
