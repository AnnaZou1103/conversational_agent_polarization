"use client";

import { useEffect, useRef, useState } from "react";

export default function InputContainer({ addMessage, canContinue, isInitializing = false }: { addMessage: Function, canContinue: boolean; isInitializing?: boolean; }) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [content, setContent] = useState("");
    const [multiline, setMultiline] = useState(false);

    const submitDisabled = canContinue || isInitializing || content.trim().length === 0;

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Recalculate height everytime change happens
        textarea.style.height = "auto";

        const maxHeight = 100; // px
        const nextHeight = Math.min(textarea.scrollHeight, maxHeight);

        // Allow container extension, once exceeding maxHeight, allow scrolling
        textarea.style.height = `${nextHeight}px`;
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";

        const lineHeight = 16; // px — adjust to match your font size
        setMultiline(textarea.scrollHeight > lineHeight * 2);
    }, [content]);

    const handleSubmit = async () => {
        if (canContinue || isInitializing) return;

        const submittedContent = content;
        setContent("");

        addMessage(submittedContent);
    };

    return (
        <section className="border-t border-zinc-200 rounded-b-xl bg-white px-4 py-4">
            <div className="flex justify-end items-start gap-3">
                <div className={`
                        flex-1 flex border border-zinc-300 bg-[#fdf8f3] px-4 py-3 shadow-sm
                        focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200
                        transition-colors duration-150
                        ${multiline ? "rounded-2xl" : "rounded-full"}
                    `}>
                    <textarea
                        ref={textareaRef}
                        value={content}
                        rows={1}
                        onChange={(e) => setContent(e.target.value)}
                        onPaste={(e) => e.preventDefault()}
                        onDrop={(e) => e.preventDefault()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        disabled={canContinue || isInitializing}
                        placeholder={canContinue ? "Conversation ended" : isInitializing ? "Please wait..." : "Type your message..."}
                        className="flex-1 resize-none overflow-y-hidden text-base placeholder:text-zinc-400 outline-none" />
                </div>

                <button
                    className={`
                        shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        transition-colors duration-150
                        ${submitDisabled
                            ? "bg-zinc-200 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 cursor-pointer shadow-sm"}
                    `}
                    disabled={submitDisabled}
                    onClick={handleSubmit}
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </section>
    );
}