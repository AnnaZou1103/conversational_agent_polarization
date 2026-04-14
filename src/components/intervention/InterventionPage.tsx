"use client";

import { useProgress } from "../layout/ProgressContext";
import { useEffect, useState } from "react";
import { getStepOffset } from "@/src/config/progressConfig";
import ChatContainer from "./ChatContainer";
import { StudyType } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import ExperimentContainer from "./ExperimentContainer";

export default function InterventionPage({ id }: { id: string; }) {
    const { setCurrentStep } = useProgress();
    const [studyType, setStudyType] = useState<StudyType>();

    const loadStudyType = async (id: string) => {
        const response = await api.user.getStudyType(id);
        const data: StudyType = await response.json();
        setStudyType(data);
    };

    useEffect(() => {
        setCurrentStep(getStepOffset("intervention") + 1);
        loadStudyType(id);
    }, []);

    if (!studyType) return null;

    return (
        <main className="px-100 py-8">
            {studyType.type === "study" ?
                <ChatContainer id={id} />
                :
                <ExperimentContainer id={id} />}
        </main>
    );
}
