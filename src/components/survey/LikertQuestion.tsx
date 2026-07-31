"use client";

import { useEffect, useRef, useState } from "react";
import QuestionCard from "../common/QuestionCard";

let measureContext: CanvasRenderingContext2D | null | undefined;

// Real glyph measurement is only available in the browser. Server-render and the
// first client render must agree (or React flags a hydration mismatch), so this
// always returns null until a client-side effect confirms canvas is available.
function measureTextWidth(text: string, fontPx: number): number | null {
    if (measureContext === undefined) {
        measureContext = typeof document === "undefined"
            ? null
            : document.createElement("canvas").getContext("2d");
    }
    if (!measureContext) return null;
    measureContext.font = `${fontPx}px Inter, ui-sans-serif, system-ui, sans-serif`;
    return measureContext.measureText(text).width;
}

// Rough per-word width estimate used only until real glyph measurement is
// available (server render + first client render, which must match exactly).
function estimateWordWidth(word: string, fontPx: number): number {
    return word.length * fontPx * 0.65;
}

// Sizes a milestone column to fit its label. Short labels (e.g. "Not at all")
// get room for the whole phrase on one line. Longer labels are sized to their
// widest single word (or widest adjacent word-pair, for 4+ word labels) instead,
// so they wrap onto a couple of short lines rather than taking a lot of column
// width just to stay on one line - and so no word ever overflows into a
// neighboring column, regardless of the label's wording.
function milestoneColumnWidth(label: string | undefined, fontPx: number, canMeasure: boolean): number {
    if (!label) return fontPx + 32;
    const words = label.trim().split(/\s+/);
    const wordWidth = (w: string) => (canMeasure ? measureTextWidth(w, fontPx) : null) ?? estimateWordWidth(w, fontPx);

    const fullWidth = wordWidth(label);
    if (words.length === 1 || fullWidth <= fontPx * 6.3) {
        return Math.ceil(fullWidth) + 14;
    }

    let width = Math.max(...words.map(wordWidth));
    if (words.length >= 4) {
        for (let i = 0; i < words.length - 1; i++) {
            width = Math.max(width, wordWidth(`${words[i]} ${words[i + 1]}`));
        }
    }
    return Math.ceil(width) + 14;
}

const SIZE_STYLES = {
    sm: { valueText: "text-sm", labelText: "text-xs", labelFontPx: 12, radio: "w-4 h-4" },
    lg: { valueText: "text-base", labelText: "text-sm", labelFontPx: 14, radio: "w-5 h-5" },
};

export default function LikertQuestion({
    question,
    min,
    max,
    milestones,
    statements,
    responses,
    size = "sm",
    variant = "grid",
    step = 1,
}: {
    question?: string,
    min: number,
    max: number,
    milestones?: { value: number, label: string; }[],
    statements: { name: string, content: string; }[];
    responses?: Record<string, string>;
    randomized?: boolean;
    size?: "sm" | "lg";
    variant?: "grid" | "slider";
    step?: number;
}) {
    const [canMeasure, setCanMeasure] = useState(false);
    useEffect(() => {
        // Flips once after hydration to switch from the SSR-safe estimate to real
        // canvas measurement, which isn't available during server rendering.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCanMeasure(true);
    }, []);

    // Slider-variant state: each track starts at `min` and must be engaged
    // (dragged, clicked, or keyed) before the value counts as an answer.
    const [values, setValues] = useState<Record<string, number>>(() => {
        const init: Record<string, number> = {};
        statements.forEach(s => { init[s.name] = responses?.[s.name] != null ? Number(responses[s.name]) : min; });
        return init;
    });
    const [touched, setTouched] = useState<Record<string, boolean>>(() => {
        const init: Record<string, boolean> = {};
        statements.forEach(s => { init[s.name] = responses?.[s.name] != null; });
        return init;
    });
    const guardRefs = useRef<Record<string, HTMLInputElement | null>>({});
    useEffect(() => {
        // An untouched slider carries a blocking custom-validity message so the
        // form won't submit until the participant engages every item; engaging
        // clears it. (Runs each render to stay in sync with `touched`.)
        statements.forEach(s => {
            guardRefs.current[s.name]?.setCustomValidity(
                touched[s.name] ? "" : "Please rate this item by moving the slider before continuing."
            );
        });
    });

    const markTouched = (name: string) =>
        setTouched(prev => (prev[name] ? prev : { ...prev, [name]: true }));

    if (variant === "slider") {
        return (
            <QuestionCard question={question ?? ""}>
                <div className="min-w-[320px]">
                    {statements.map((statement, index) => {
                        const val = values[statement.name];
                        const isTouched = touched[statement.name];
                        return (
                            <div
                                key={index}
                                className="grid items-center gap-4 py-4 px-3"
                                style={{ gridTemplateColumns: "minmax(140px, 220px) 1fr minmax(44px, auto)", backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                            >
                                <div className="pr-2 text-lg font-medium">{statement.content}</div>

                                <div className="px-1">
                                    <input
                                        type="range"
                                        suppressHydrationWarning
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={val}
                                        onChange={e => {
                                            const v = Number(e.target.value);
                                            setValues(prev => ({ ...prev, [statement.name]: v }));
                                            markTouched(statement.name);
                                        }}
                                        onPointerDown={() => markTouched(statement.name)}
                                        onKeyDown={() => markTouched(statement.name)}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((val - min) / (max - min)) * 100}%, #e5e7eb ${((val - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
                                        }}
                                    />
                                    {milestones && milestones.length > 0 &&
                                        <div className="mt-1 flex justify-between gap-2 text-base text-zinc-600">
                                            {milestones.map((m, i) => (
                                                <span
                                                    key={m.value}
                                                    className="leading-tight"
                                                    style={{ textAlign: i === 0 ? "left" : i === milestones.length - 1 ? "right" : "center" }}
                                                >
                                                    {m.label}
                                                </span>
                                            ))}
                                        </div>}
                                    {/* Hidden field the form actually reads: empty (and thus blocking) until touched. */}
                                    <input
                                        ref={el => { guardRefs.current[statement.name] = el; }}
                                        type="text"
                                        name={statement.name}
                                        value={isTouched ? String(val) : ""}
                                        onChange={() => { }}
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }}
                                    />
                                </div>

                                <div className={`text-lg tabular-nums text-right ${isTouched ? "text-blue-600 font-semibold" : "text-zinc-400"}`}>
                                    {isTouched ? val : "—"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </QuestionCard>
        );
    }

    const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const labelByValue = new Map(milestones?.map(m => [m.value, m.label]));
    const styles = SIZE_STYLES[size];
    const gridTemplateColumns = `minmax(160px, 1fr) ${scale.map(v => `${milestoneColumnWidth(labelByValue.get(v), styles.labelFontPx, canMeasure)}px`).join(" ")}`;
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
                                <div className={`${styles.valueText} font-semibold text-zinc-600`}>{value}</div>
                                {labelByValue.has(value) &&
                                    <div className={`${styles.labelText} text-zinc-500 mt-0.5 leading-tight`}>{labelByValue.get(value)}</div>}
                            </div>
                        ))}
                    </div>

                    {statements.map((statement, index) => (
                        <div
                            key={index}
                            className="grid items-center gap-1 py-1 pl-2"
                            style={{ gridTemplateColumns, backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                        >
                            <div className="pr-3">{statement.content}</div>

                            {scale.map(value => (
                                <label key={value} className="flex flex-col items-center cursor-pointer space-y-2">
                                    <input
                                        type="radio"
                                        suppressHydrationWarning
                                        name={statement.name}
                                        value={value}
                                        required={true}
                                        defaultChecked={responses?.[statement.name] === value.toString()}
                                        className={`${styles.radio} text-blue-600 mb-1 cursor-pointer`}
                                    />
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </QuestionCard>
    );
}
