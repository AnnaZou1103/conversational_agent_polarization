"use client";
import { TOTAL_STEPS } from "@/src/config/progressConfig";
import { createContext, useContext, useState } from "react";

interface ProgressContextType {
    setCurrentStep: (n: number) => void;
    percentage: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode; }) {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <ProgressContext.Provider value={{
            setCurrentStep,
            percentage: Math.round((currentStep / TOTAL_STEPS) * 100),
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const ctx = useContext(ProgressContext);
    if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
    return ctx;
};