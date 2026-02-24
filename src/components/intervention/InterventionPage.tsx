"use client";

import { routeToState } from "@/src/utils/state/client";
import { useRouter } from "next/navigation";

export default function InterventionPage({ id }: { id: string; }) {
    const router = useRouter();
    return (
        <main className="flex flex-col items-start justify-center gap-12 px-80 py-8">
            <button className="btn-blue" onClick={() => routeToState(router, id, "to_post_survey")}>Next</button>
        </main>
    );
}
