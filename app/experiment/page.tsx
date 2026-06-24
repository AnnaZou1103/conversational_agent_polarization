"use client";

import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CONDITIONS = [
    { value: "common_identity", label: "Common Identity" },
    { value: "personal_narrative", label: "Personal Narrative" },
    { value: "misperception_correction", label: "Misperception Correction" },
    { value: "control", label: "Control" },
    { value: "control_politics", label: "Control (Politics)" },
];

export default function ExperimentPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleStart = async () => {
        setLoading(true);
        const id = await api.experiment.generateExperimentUser(selected || undefined);
        router.replace(`/${id}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
            <h1 className="text-2xl font-semibold">Select a Condition</h1>
            <div className="flex flex-col gap-3 w-72">
                {CONDITIONS.map((c) => (
                    <button
                        key={c.value}
                        onClick={() => setSelected(c.value)}
                        className={`px-5 py-3 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
                            selected === c.value
                                ? "bg-black text-white border-black"
                                : "bg-white text-black border-gray-300 hover:border-black"
                        }`}>
                        {c.label}
                    </button>
                ))}
                <button
                    onClick={() => setSelected("")}
                    className={`px-5 py-3 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
                        selected === ""
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300 hover:border-black"
                    }`}>
                    Random
                </button>
            </div>
            <button
                onClick={handleStart}
                disabled={loading}
                className="px-8 py-4 bg-black text-white text-sm font-semibold rounded-full cursor-pointer disabled:opacity-50">
                {loading ? "Starting..." : "Start →"}
            </button>
        </main>
    );
}
