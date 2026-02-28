"use client";

import { routeToState } from "@/src/lib/state/client";
import { useRouter } from "next/navigation";
import MessageCard from "../common/MessageCard";
import { useProgress } from "../layout/ProgressContext";
import { useEffect } from "react";
import { getStepOffset } from "@/src/config/progressConfig";

export default function TransitionPage({
    id,
    progressKey,
    destination,
    content
}: {
    id: string,
    progressKey: "to-intervention" | "to-post-survey",
    destination: "intervention" | "post_survey",
    content: React.ReactNode;
}) {
    const { setCurrentStep } = useProgress();

    useEffect(() => {
        setCurrentStep(getStepOffset(progressKey) + 1);
    }, []);

    const router = useRouter();

    return (
        <MessageCard>
            {content}
            <div className="w-full flex justify-between mt-8">
                <button
                    className="btn-zinc"
                    onClick={() => routeToState(router, id, "complete")}>
                    I wish to withdraw
                </button>
                <button
                    className="btn-blue"
                    onClick={() => routeToState(router, id, destination)}>
                    Continue
                </button>
            </div>
        </MessageCard>
    );
}
