"use client";

import { routeToState } from "@/src/lib/state/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function InputContainer({ id, addMessage }: { id: string, addMessage: Function; }) {
    const router = useRouter();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [message, setMessage] = useState("");

    const submitDisabled = message.trim().length === 0;
    const continueDisabled = false;

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Recalculate height everytime change happens
        textarea.style.height = "auto";

        const maxHeight = 180; // px
        const nextHeight = Math.min(textarea.scrollHeight, maxHeight);

        // Allow container extension, once exceeding maxHeight, allow scrolling
        textarea.style.height = `${nextHeight}px`;
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [message]);

    const handleSubmit = () => {
        const submittedMessage = message;
        addMessage(submittedMessage);
        setMessage("");
    };

    return (
        <section className="border-t border-zinc-200 rounded-b-xl bg-white px-4 py-4">
            <div className="flex justify-end gap-3">
                <div className="
                    flex-1 flex rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 shadow-sm 
                    focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200
                ">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        rows={1}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 resize-none overflow-y-hidden text-base placeholder:text-zinc-400 outline-none" />
                </div>

                <div className="flex flex-col justify-end space-y-2">
                    <button
                        className={`input-btn-${submitDisabled ? "zinc" : "blue"} shrink-0`}
                        disabled={submitDisabled}
                        onClick={handleSubmit}>
                        Submit ↑
                    </button>
                    <button
                        className={`input-btn-${continueDisabled ? "zinc" : "blue"} shrink-0`}
                        disabled={continueDisabled}
                        onClick={async () => await routeToState(router, id, "to_post_survey")}>
                        Continue
                    </button>
                </div>
            </div>
        </section>
    );
}