"use client";

import MessageCard from "@/src/components/common/MessageCard";
import { useProgress } from "@/src/components/layout/ProgressContext";
import { prolificRedirectUrls, screenedOutMessage, thankyouMessage } from "@/src/config/messageConfig";
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

    const prolificUrl = screenedOut ? prolificRedirectUrls.screenedOut : prolificRedirectUrls.completed;

    return (
        <MessageCard>
            <span className="text-5xl">{screenedOut ? "👋" : "✅"}</span>
            {screenedOut ? screenedOutMessage : thankyouMessage}
            <a href={prolificUrl} className="btn-blue inline-flex items-center justify-center">
                Continue to Prolific
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
