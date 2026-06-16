"use client";

import { useProgress } from "../layout/ProgressContext";
import { useEffect, useState } from "react";
import { getStepOffset } from "@/src/config/progressConfig";
import ChatContainer from "./ChatContainer";
import { AgentStrategy, ChatObservation, StudyType } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import ExperimentContainer from "./ExperimentContainer";
import ManipulationCard from "./cards/ManipulationCard";

export default function InterventionPage({ id }: { id: string; }) {
    const { setCurrentStep } = useProgress();
    const [studyType, setStudyType] = useState<StudyType>();
    const [agentStrategy, setAgentStrategy] = useState<AgentStrategy>();
    const [chatObservation, setChatObservation] = useState<ChatObservation>();

    const handleChatObservationUpdate = async (userId: string) => {
        const response = await api.chat.getChatObservation(userId);
        const data: ChatObservation = await response.json();
        setChatObservation(data);
    };

    const loadInterventionData = async (id: string) => {
        const [studyTypeResponse, strategyResponse] = await Promise.all([
            api.user.getStudyType(id),
            api.user.getAgentStrategy(id),
        ]);

        const studyTypeData: StudyType = await studyTypeResponse.json();
        const strategyData: AgentStrategy = await strategyResponse.json();

        setStudyType(studyTypeData);
        setAgentStrategy(strategyData);
    };

    useEffect(() => {
        setCurrentStep(getStepOffset("intervention") + 1);
        loadInterventionData(id);
    }, []);

    if (!studyType || !agentStrategy) return null;

    return (
        <main className="flex flex-col gap-6 px-4 py-4 sm:px-6 lg:flex-row lg:gap-10 lg:px-12 lg:py-6 xl:px-24 xl:gap-20 2xl:px-40">
            {studyType.type === "study" ?
                <ChatContainer id={id} strategy={agentStrategy.strategy} onChatObservationUpdate={handleChatObservationUpdate} />
                :
                <ExperimentContainer id={id} strategy={agentStrategy.strategy} onChatObservationUpdate={handleChatObservationUpdate} />}

            <ManipulationCard strategy={agentStrategy.strategy} chatObservation={chatObservation} />
        </main>
    );
}
