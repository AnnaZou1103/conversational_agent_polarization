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
    // Fixed side columns (not content-sized) so every statement row and the
    // header share the exact same middle width, and all sliders are equal length.
    const gridTemplateColumns = "120px minmax(220px, 1fr) 120px";

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

    const pctOf = (v: number) => ((v - min) / (max - min)) * 100;
    const centerPct = pctOf(center);

    // Header labels and the slider thumb/fill all live inside an identically
    // padded track box and are positioned with the same value->percent mapping,
    // so a value's thumb always lines up with its column label - including the
    // two ends, whose overflowing half falls into the empty header side cells.
    const labelPos = (value: number): React.CSSProperties =>
        ({ left: `${pctOf(value)}%`, transform: "translateX(-50%)" });

    return (
        <QuestionCard question={question ?? ""}>
            <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                    <div className="grid items-end gap-1 mb-2" style={{ gridTemplateColumns }}>
                        <div />
                        <div className="px-3">
                            <div className="relative h-12">
                                {scale.map(value => (
                                    <div
                                        key={value}
                                        className="absolute text-center"
                                        style={{ ...labelPos(value), maxWidth: "72px" }}
                                    >
                                        <div className="text-sm font-semibold text-zinc-600">{Math.abs(value - center)}</div>
                                        {labelByValue.has(value) &&
                                            <div className="text-xs text-zinc-500 mt-0.5 leading-tight">{labelByValue.get(value)}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div />
                    </div>

                    {statements.map((statement, index) => {
                        const val = values[statement.name];
                        const valuePct = pctOf(val);
                        const track = "#e5e7eb";
                        const fill = "#2563eb";
                        // Blue fill originates at the neutral midpoint and extends toward the
                        // chosen side (distance from neutral, not from the far end).
                        const background = val >= center
                            ? `linear-gradient(to right, ${track} 0%, ${track} ${centerPct}%, ${fill} ${centerPct}%, ${fill} ${valuePct}%, ${track} ${valuePct}%, ${track} 100%)`
                            : `linear-gradient(to right, ${track} 0%, ${track} ${valuePct}%, ${fill} ${valuePct}%, ${fill} ${centerPct}%, ${track} ${centerPct}%, ${track} 100%)`;
                        return (
                            <div
                                key={index}
                                className="grid items-center gap-1 py-3"
                                style={{ gridTemplateColumns, backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                            >
                                <div className="text-right pr-2 text-sm whitespace-nowrap">{statement.leftLabel}</div>

                                <div className="px-3">
                                    <div className="relative h-5 flex items-center">
                                        {/* Visible track + centre-origin blue fill. */}
                                        <div className="absolute left-0 right-0 h-2 rounded-full pointer-events-none" style={{ background }} />
                                        {/* Visible thumb, positioned by value percent to match the labels. */}
                                        <div
                                            className="absolute h-4 w-4 rounded-full bg-white border-2 border-blue-600 shadow pointer-events-none"
                                            style={{ left: `${valuePct}%`, transform: "translateX(-50%)" }}
                                        />
                                        {/* Transparent native range on top handles drag / click / keyboard. */}
                                        <input
                                            type="range"
                                            suppressHydrationWarning
                                            name={statement.name}
                                            min={min}
                                            max={max}
                                            step={1}
                                            value={val}
                                            onChange={e => {
                                                const v = Number(e.target.value);
                                                setValues(prev => ({ ...prev, [statement.name]: v }));
                                            }}
                                            className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
                                        />
                                    </div>
                                </div>

                                <div className="pl-2 text-sm whitespace-nowrap">{statement.rightLabel}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </QuestionCard>
    );
}
