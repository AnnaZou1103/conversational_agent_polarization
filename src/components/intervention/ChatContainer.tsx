"use client";

import { useState } from "react";
import InputContainer from "./InputContainer";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

export default function ChatContainer({ id }: { id: string; }) {
    const [messages, setMessages] = useState<string[]>([]);

    const addMessage = (message: string) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <section className="flex h-190 w-full flex-col rounded-xl bg-white shadow-card">
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <div key={index} className="space-y-5">
                        <UserMessage message={message} />
                        <AssistantMessage message={message} />
                    </div>
                ))}
            </div>
            <InputContainer id={id} addMessage={addMessage} />
        </section>
    );
}