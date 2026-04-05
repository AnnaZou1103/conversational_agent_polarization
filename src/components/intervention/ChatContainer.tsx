"use client";

import { useEffect, useRef, useState } from "react";
import InputContainer from "./InputContainer";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { AgentStrategy, ChatResponse, Message, ModelToCondition } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";
import { routeToState } from "@/src/lib/state/client";

export default function ChatContainer({ id }: { id: string; }) {
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [canContinue, setCanContinue] = useState<boolean>(false);
    const [agentStrategy, setAgentStrategy] = useState<AgentStrategy>();

    const loadConversation = async (id: string) => {
        const historyResponse = await api.chat.getHistory(id);
        const historyData: Message[] = await historyResponse.json();
        setMessages(historyData.map((message, _) => ({ ...message, status: "done" })));

        const strategyResponse = await api.user.getAgentStrategy(id);
        const strategyData = await strategyResponse.json();
        setAgentStrategy(strategyData);
    };

    useEffect(() => {
        loadConversation(id);
    }, []);

    const addMessage = async (content: string) => {
        setCanContinue(false);
        setMessages(prev => [...prev, { role: "user", content: content }, { role: "assistant", content: "", status: "streaming" }]);

        const handleMessage = (event: ChatResponse) => {
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

                if (event.conversationComplete) {
                    setCanContinue(true);
                }
            }
        };

        await api.chat.llmInference(id, { message: content, model: agentStrategy ? ModelToCondition[agentStrategy.strategy] : undefined, }, handleMessage);
    };

    const bottomRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isNearBottom = () => {
        const el = containerRef.current;
        if (!el) return true;

        return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    };

    useEffect(() => {
        if (canContinue) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [canContinue]);

    useEffect(() => {
        const last = messages[messages.length - 1];

        if (last?.status === "streaming" && isNearBottom()) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <section className="flex h-190 w-full flex-col rounded-xl bg-white shadow-card">
            <ChatHeader />
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-8">
                {messages.map((message, index) => (
                    <div key={index} className="space-y-5">
                        {message.role === "user" ?
                            <UserMessage message={message} />
                            :
                            <AssistantMessage message={message} />}
                    </div>
                ))}

                {/* Temporary jump to end state */}
                {canContinue && <div className="flex justify-center">
                    <button
                        className="px-6 py-4 bg-black cursor-pointer text-white text-sm font-semibold rounded-full"
                        onClick={async () => await routeToState(router, id, "complete")}>
                        Leave Intervention →
                    </button>
                </div>}
                <div ref={bottomRef} />
            </div>
            <InputContainer addMessage={addMessage} canContinue={canContinue} />
        </section>
    );
}