"use client";

import { useState } from "react";
import QuestionCard from "../common/QuestionCard";

export default function SemanticDifferentialQuestion({
    question,
    min,
    max,
    milestones,
    statements,
    responses,
}: {
    question?: string,
    min: number,
    max: number,
    milestones?: { value: number, label: string; }[],
    statements: { name: string, leftLabel: string, rightLabel: string; }[];
    responses?: Record<string, string>;
    randomized?: boolean;
}) {
    const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const labelByValue = new Map(milestones?.map(m => [m.value, m.label]));
    const center = (min + max) / 2;
    const gridTemplateColumns = `minmax(85px, 1fr) repeat(${scale.length}, minmax(48px, 1fr)) minmax(85px, 1fr)`;

    // Sliders start at the neutral midpoint and can be dragged left or right.
    // The value is always present (defaults to `center`), so an untouched
    // slider reads as neutral rather than as "no answer".
    const [values, setValues] = useState<Record<string, number>>(() => {
        const init: Record<string, number> = {};
        statements.forEach(s => {
            const existing = responses?.[s.name];
            init[s.name] = existing ? Number(existing) : center;
        });
        return init;
    });
    const [touched, setTouched] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        statements.forEach(s => { init[s.name] = responses?.[s.name] != null; });
        return init;
    });

    return (
        <QuestionCard question={question ?? ""}>
            <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                    <div
                        className="grid items-end gap-1 mb-3"
                        style={{ gridTemplateColumns }}
                    >
                        <div />
                        {scale.map(value => (
                            <div key={value} className="text-center">
                                <div className="text-sm font-semibold text-zinc-600">{Math.abs(value - center)}</div>
                                {labelByValue.has(value) &&
                                    <div className="text-xs text-zinc-500 mt-0.5 leading-tight">{labelByValue.get(value)}</div>}
                            </div>
                        ))}
                        <div />
                    </div>

                    {statements.map((statement, index) => (
                        <div
                            key={index}
                            className="grid items-center gap-1 py-3 pl-2"
                            style={{ gridTemplateColumns, backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                        >
                            <div className="text-right pr-2 text-sm whitespace-nowrap">{statement.leftLabel}</div>

                            <div className="px-2" style={{ gridColumn: `span ${scale.length}` }}>
                                <input
                                    type="range"
                                    suppressHydrationWarning
                                    name={statement.name}
                                    min={min}
                                    max={max}
                                    step={1}
                                    value={values[statement.name]}
                                    onChange={e => {
                                        const v = Number(e.target.value);
                                        setValues(prev => ({ ...prev, [statement.name]: v }));
                                        setTouched(prev => ({ ...prev, [statement.name]: true }));
                                    }}
                                    className={`w-full cursor-pointer ${touched[statement.name] ? "accent-blue-600" : "accent-zinc-400"}`}
                                />
                            </div>

                            <div className="pl-2 text-sm whitespace-nowrap">{statement.rightLabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </QuestionCard>
    );
}
