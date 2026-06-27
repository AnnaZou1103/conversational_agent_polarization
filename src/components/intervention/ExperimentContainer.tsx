"use client";

import { useEffect, useRef, useState } from "react";
import InputContainer from "./InputContainer";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import { ChatObservation, ChatResponse, MCObservation, Message, ModelToCondition, Strategy } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";
import { routeToState } from "@/src/lib/state/client";
import PartyModal from "./PartyModal";
import QuizQuickReplies, { buildQuizRenderPlan, stripQuizOptions } from "./QuizQuickReplies";

export default function ExperimentContainer({ id, strategy, onChatObservationUpdate }: { id: string; strategy: Strategy; onChatObservationUpdate: (id: string) => Promise<void>; }) {
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [canContinue, setCanContinue] = useState<boolean>(false);
    const [showPartyModal, setShowPartyModal] = useState<boolean>(false);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [quickReply, setQuickReply] = useState<{ text: string; nonce: number } | null>(null);
    const [mcObservation, setMcObservation] = useState<MCObservation | null>(null);
    // Snapshot of MCObservation.questions.length taken after every turn in
    // this session — lets buildQuizRenderPlan tell whether a given question
    // occurrence actually got answered, even if the agent re-asked it.
    const [mcTimeline, setMcTimeline] = useState<number[]>([]);
    // Reserves this call's slot in mcTimeline synchronously, before the async
    // fetch starts — otherwise two overlapping checkCompletion calls could
    // write their results in resolution order rather than call order (e.g. if
    // the mount-time fetch resolved after the first live turn's), scrambling
    // every later lookup in buildQuizRenderPlan.
    const nextTimelineSlot = useRef(0);
    const historyAssistantCount = useRef(0);
    // The option the user last clicked for the current question, before it's
    // actually sent — lets the chip highlight immediately even if they change
    // their mind and click a different option before submitting.
    const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);

    const handleQuickReply = (text: string) => {
        setQuickReply({ text, nonce: Date.now() });
        const match = text.match(/^(\d+)\./);
        setPendingAnswer(match ? Number(match[1]) : null);
    };

    const checkCompletion = async () => {
        const slot = nextTimelineSlot.current++;
        const response = await api.chat.getChatObservation(id);
        const data: ChatObservation = await response.json();
        if (strategy === "misperception_correction") {
            const observation = data?.observation as MCObservation | undefined;
            setMcObservation(observation ?? null);
            setMcTimeline(prev => {
                const next = [...prev];
                next[slot] = observation?.questions?.length ?? 0;
                return next;
            });
        }
        if (data?.stage === "complete") setCanContinue(true);
    };
    const [partyLoaded, setPartyLoaded] = useState<boolean>(false);
    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);


    const loadConversation = async (id: string) => {
        const historyResponse = await api.chat.getHistory(id);
        const historyData: Message[] = await historyResponse.json();
        historyAssistantCount.current = historyData.filter(m => m.role === "assistant").length;
        setMessages(historyData.map((message, _) => ({ ...message, status: "done" })));
        setHistoryLoaded(true);

        const userPartyResponse = await api.user.getUserParty(id);
        if (userPartyResponse.status === 404) {
            setShowPartyModal(true);
        } else {
            setPartyLoaded(true);
        }
    };

    const initializeConversation = async (id: string) => {
        // Only initialize if no messages exist
        if (messages.length === 0) {
            // Add streaming assistant message without user message
            setMessages([{ role: "assistant", content: "", status: "streaming" }]);

            const handleMessage = async (event: ChatResponse) => {
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
                    // For misperception_correction, the greeting and Q1 are
                    // the SAME message (see the backend's STAGE_1 prompt) —
                    // so this turn needs its own mcTimeline slot just like any
                    // other live turn, or buildQuizRenderPlan's offsets drift.
                    await checkCompletion();
                    onChatObservationUpdate(id);
                }
            };

            try {
                // Send empty message to get greeting
                await api.chat.llmInference(
                    id,
                    { message: "", model: strategy ? ModelToCondition[strategy] : undefined },
                    handleMessage
                );
            } catch {
                setMessages(prev => prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: "Failed to connect. Please refresh the page.", status: "done" } : m
                ));
            } finally {
                setIsInitializing(false);
            }
        } else {
            setIsInitializing(false);
        }
    };

    const didLoad = useRef(false);
    const didInit = useRef(false);

    useEffect(() => {
        // Guard against React Strict Mode double-invocation: a second
        // loadConversation would reset messages and wipe the greeting.
        if (didLoad.current) return;
        didLoad.current = true;
        loadConversation(id);
        onChatObservationUpdate(id);
        checkCompletion();
    }, []);

    useEffect(() => {
        if (historyLoaded && partyLoaded && !didInit.current) {
            didInit.current = true;
            initializeConversation(id);
        }
    }, [historyLoaded, partyLoaded]);

    const addMessage = async (content: string) => {
        setCanContinue(false);
        setPendingAnswer(null);
        setMessages(prev => [...prev, { role: "user", content: content }, { role: "assistant", content: "", status: "streaming" }]);

        const handleMessage = async (event: ChatResponse) => {
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

                await checkCompletion();
                onChatObservationUpdate(id);
            }
        };

        await api.chat.llmInference(id, { message: content, model: strategy ? ModelToCondition[strategy] : undefined, }, handleMessage);
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

    const onSubmit = () => {
        setPartyLoaded(true);
        setShowPartyModal(false);
    };

    return (
        <section className="flex-2 flex min-h-[85vh] lg:min-h-0 lg:h-190 w-full flex-col rounded-xl bg-white shadow-card">
            {showPartyModal && <PartyModal id={id} onSubmit={onSubmit} />}

            <ChatHeader />
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-8">
                {(() => {
                    const quizPlan = buildQuizRenderPlan(messages, strategy, mcObservation, mcTimeline, historyAssistantCount.current, canContinue);

                    return messages.map((message, index) => {
                        const info = quizPlan[index];
                        const displayMessage = info.isQuizQuestion
                            ? { ...message, content: stripQuizOptions(message.content) }
                            : message;

                        return (
                            <div key={index} className="space-y-2">
                                {message.role === "user" ?
                                    <UserMessage message={displayMessage} />
                                    :
                                    <AssistantMessage message={displayMessage} />}
                                {info.isQuizQuestion && (
                                    <QuizQuickReplies
                                        onSelect={handleQuickReply}
                                        selectedAnswer={info.selectedAnswer ?? (info.isActive ? pendingAnswer : null)}
                                        readOnly={info.readOnly}
                                    />
                                )}
                            </div>
                        );
                    });
                })()}

                {canContinue && <div className="flex justify-center">
                    <button
                        className="px-6 py-4 bg-black cursor-pointer text-white text-sm font-semibold rounded-full"
                        onClick={async () => await routeToState(router, id, "to_post_survey")}>
                        Continue to Survey →
                    </button>
                </div>}
                <div ref={bottomRef} />
            </div>
            <InputContainer addMessage={addMessage} canContinue={canContinue} isInitializing={isInitializing} quickReply={quickReply} onClearSelection={() => setPendingAnswer(null)} />
        </section>
    );
}