"use client";

import { useEffect, useRef, useState } from "react";
import InputContainer from "./InputContainer";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { Message } from "@/src/types/interfaces";
import api from "@/src/lib/api";

export default function ChatContainer({ id }: { id: string; }) {
    const [messages, setMessages] = useState<Message[]>([]);

    const loadConversation = async (id: string) => {
        const response = await api.chat.getHistory(id);
        const data: Message[] = await response.json();
        console.log(data);
        setMessages(data.map((message, _) => ({ ...message, status: "done" })));
    };

    useEffect(() => {
        loadConversation(id);
    }, []);

    const addMessage = async (content: string) => {
        setMessages(prev => [...prev, { role: "user", content: content }, { role: "assistant", content: "", status: "streaming" }]);

        const handleMessage = (event: any) => {
            if (event.type === "token") {
                setMessages(prev => {
                    const lastIndex = prev.length - 1;
                    return prev.map((message, index) =>
                        index === lastIndex ? { ...message, content: message.content + event.content } : message
                    );
                });
            }

            if (event.type === "done") {
                setMessages(prev => {
                    const lastIndex = prev.length - 1;
                    return prev.map((message, index) =>
                        index === lastIndex ? { ...message, status: "done" } : message
                    );
                });
            }
        };

        await api.chat.llmInference(id, { message: content }, handleMessage);
    };

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isNearBottom = () => {
        const el = containerRef.current;
        if (!el) return true;

        return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    };

    useEffect(() => {
        const last = messages[messages.length - 1];

        if (last?.status === "streaming" && isNearBottom()) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
        }
    }, [messages]);

    return (
        <section className="flex h-190 w-full flex-col rounded-xl bg-white shadow-card">
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <div key={index} className="space-y-5">
                        {message.role === "user" ?
                            <UserMessage message={message} />
                            :
                            <AssistantMessage message={message} />}
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>
            <InputContainer id={id} addMessage={addMessage} />
        </section>
    );
}