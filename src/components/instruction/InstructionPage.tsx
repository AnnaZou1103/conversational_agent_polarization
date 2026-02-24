"use client";

import InstructionSection from "@/src/components/instruction/InstructionSection";
import { instructionItems } from "@/src/config/instructionConfig";
import { routeToState } from "@/src/utils/state/client";
import { useRouter } from "next/navigation";


export default function InstructionPage({ id }: { id: string; }) {
    const router = useRouter();
    return (
        <main className="flex flex-col items-center justify-center gap-12 px-80 py-8">
            {instructionItems.map((item, idx) => (
                <InstructionSection key={idx} title={item.title} titleSize={item.titleSize}>
                    {item.content}
                </InstructionSection>
            ))}

            <div className="flex justify-start w-full space-x-3">
                <button
                    className="btn-blue"
                    onClick={() => routeToState(router, id, "pre_survey")}>
                    Next
                </button>
            </div>
        </main>
    );
}