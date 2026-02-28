"use client";

import { routeToState } from "@/src/lib/state/client";
import { useRouter } from "next/navigation";
import { useProgress } from "../layout/ProgressContext";
import { useEffect } from "react";
import { getStepOffset } from "@/src/config/progressConfig";

export default function InterventionPage({ id }: { id: string; }) {
    const { setCurrentStep } = useProgress();

    useEffect(() => {
        setCurrentStep(getStepOffset("intervention") + 1);
    }, []);

    const router = useRouter();
    return (
        <main className="flex flex-col items-start justify-center gap-12 px-80 py-8">
            <button className="btn-blue" onClick={() => routeToState(router, id, "to_post_survey")}>Next</button>
        </main>
    );
}
