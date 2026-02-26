"use client";

import ConsentFormSection from "@/src/components/consentForm/ConsentFormSection";
import { consentFormItems } from "@/src/config/consentFormConfig";
import { routeToState } from "@/src/utils/state/client";
import { useRouter } from "next/navigation";


export default function ConcentFormPage({ id }: { id: string; }) {
    const router = useRouter();
    return (
        <main className="flex items-center justify-center py-8">
            <div className="card-container flex flex-col items-center gap-4 shadow-[0px_2px_12px_rgba(0,0,0,0.08)]">
                <p className="text-[32px] font-bold">Consent Form</p>
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
            </div>
        </main>
    );
}