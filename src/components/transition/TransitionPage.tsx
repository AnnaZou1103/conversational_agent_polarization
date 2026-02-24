"use client";

import { routeToState } from "@/src/utils/state/client";
import { useRouter } from "next/navigation";
import MessageCard from "../common/MessageCard";

export default function TransitionPage({ id, destination, content }: { id: string, destination: "intervention" | "post_survey", content: string; }) {
    const router = useRouter();
    return (
        <MessageCard>
            <span className="text-xl whitespace-pre-line">{content}</span>
            <button className="btn-blue" onClick={() => routeToState(router, id, destination)}>Next</button>
        </MessageCard>
    );
}
