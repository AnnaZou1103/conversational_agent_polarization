"use client";

import ConsentFormSection from "@/src/components/consentForm/ConsentFormSection";
import { consentFormItems } from "@/src/config/consentFormConfig";
import { routeToState } from "@/src/lib/state/client";
import { useRouter } from "next/navigation";
import { useProgress } from "../layout/ProgressContext";
import { useEffect } from "react";
import { getStepOffset } from "@/src/config/progressConfig";
import MessageCard from "../common/MessageCard";


export default function ConcentFormPage({ id }: { id: string; }) {
    const { setCurrentStep } = useProgress();

    useEffect(() => {
        setCurrentStep(getStepOffset("consent") + 1);
    }, []);

    const router = useRouter();
    return (
        <MessageCard>
            <p className="text-title">Consent Form</p>
            {consentFormItems.map((item, idx) => (
                <ConsentFormSection key={idx} title={item.title}>
                    {item.content}
                </ConsentFormSection>
            ))}

            <div className="flex items-start justify-between w-full space-x-3">
                <p>Thank you.</p>
                <div className="flex gap-6">
                    <button
                        className="btn-zinc"
                        onClick={() => routeToState(router, id, "complete")}>
                        I wish to withdraw
                    </button>
                    <button
                        className="btn-blue"
                        onClick={() => routeToState(router, id, "pre_survey")}>
                        Continue
                    </button>
                </div>
            </div>
        </MessageCard>
    );
}