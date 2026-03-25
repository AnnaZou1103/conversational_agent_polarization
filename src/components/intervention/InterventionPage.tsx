"use client";

import { useProgress } from "../layout/ProgressContext";
import { useEffect } from "react";
import { getStepOffset } from "@/src/config/progressConfig";
import ChatContainer from "./ChatContainer";

export default function InterventionPage({ id }: { id: string; }) {
    const { setCurrentStep } = useProgress();

    useEffect(() => {
        setCurrentStep(getStepOffset("intervention") + 1);
    }, []);

    return (
        <main className="px-100 py-8">
            <ChatContainer id={id} />
        </main>
    );
}
