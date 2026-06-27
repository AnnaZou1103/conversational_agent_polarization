"use client";

import type { MCObservation, Message, Strategy } from "@/src/types/interfaces";

// The misperception_correction backend prompt always presents these four
// options as a numbered list whenever it asks a new quiz question (see
// Strategy.MISPERCEPTION_CORRECTION in the backend's prompts.py). Detecting
// that pattern lets us offer the same options as clickable quick replies
// without needing the backend to return structured data.
const QUIZ_OPTIONS = ["1. Never", "2. Probably not", "3. Probably", "4. Definitely"];

export function hasQuizOptions(content: string): boolean {
    const labels = ["Never", "Probably not", "Probably", "Definitely"];
    if (!labels.every(label => new RegExp(`\\d\\.\\s*${label}\\b`, "i").test(content))) return false;

    // Every real question template in the backend ends with "?" immediately
    // before presenting the options (e.g. "...win elections?\n\n  1. Never...");
    // reveal text never repeats the numbered-list format. Requiring a "?"
    // before the first option avoids false-triggering quick-reply chips if the
    // agent ever reformats a reveal/summary as a numbered list instead of
    // asking a new question.
    const firstOptionIndex = content.search(/\d\.\s*Never\b/i);
    if (firstOptionIndex === -1) return false;
    return content.slice(0, firstOptionIndex).includes("?");
}

// Removes the numbered option list from the message text so it isn't shown
// twice once the quick-reply chips take over presenting those options.
const OPTION_LIST_REGEX = /\n{1,2}\s*\d\.\s*Never\s*\n+\s*\d\.\s*Probably not\s*\n+\s*\d\.\s*Probably\s*\n+\s*\d\.\s*Definitely\s*/i;

export function stripQuizOptions(content: string): string {
    return content.replace(OPTION_LIST_REGEX, "").trimEnd();
}

export interface QuizRenderInfo {
    isQuizQuestion: boolean;
    /** Confirmed answer for this occurrence, once resolved — null if not (yet) answered. */
    selectedAnswer: number | null;
    /** True once this occurrence is no longer the live question being asked (locks the chips). */
    readOnly: boolean;
    /** True if this occurrence is still awaiting the user's reply (use a local pending pick here). */
    isActive: boolean;
}

/**
 * Maps each message to whether it's a quiz question and, if so, which answer
 * (if any) actually got recorded for it.
 *
 * Naively counting "the Nth message containing the option list = the Nth
 * question" breaks if the agent ever re-presents the same question (e.g. the
 * user replied with something that didn't parse as a Likert answer) — the
 * backend only advances to question N+1 once question N's answer is recorded
 * (see current_question_id in the backend's pipeline.py), so a re-ask doesn't
 * add a new entry to MCObservation.questions, but it would still inflate a
 * naive running counter and misattribute later answers to the wrong bubble.
 *
 * For messages generated during this session, `mcTimeline` (a snapshot of
 * MCObservation.questions.length taken after every turn) lets us check
 * whether the confirmed-answer count actually increased right after this
 * specific occurrence — i.e. whether THIS attempt was the one that got
 * recorded, not an earlier or later one. Messages loaded from history (before
 * this session started) have no such snapshots, so they fall back to the
 * naive sequential assumption (fine as long as that prefix has no duplicates).
 */
export function buildQuizRenderPlan(
    messages: Message[],
    strategy: Strategy,
    mcObservation: MCObservation | null,
    mcTimeline: number[],
    historyAssistantCount: number,
    canContinue: boolean
): QuizRenderInfo[] {
    let assistantOrdinal = 0;
    let historyQuizIndex = 0;

    return messages.map((message, index) => {
        if (message.role === "assistant") assistantOrdinal += 1;

        const isQuizQuestion =
            strategy === "misperception_correction" &&
            message.role === "assistant" &&
            message.status === "done" &&
            hasQuizOptions(message.content);

        if (!isQuizQuestion) {
            return { isQuizQuestion: false, selectedAnswer: null, readOnly: false, isActive: false };
        }

        const isActiveTurn = index === messages.length - 1 && !canContinue;
        const isLive = assistantOrdinal > historyAssistantCount;

        let answeredIndex: number | null = null;

        if (isLive) {
            // `liveOffset` is this question's own turn number (1-based) within
            // this session. mcTimeline[liveOffset] is the confirmed-answer count
            // snapshotted right after THIS question was asked (i.e. before its
            // reply has been processed); mcTimeline[liveOffset + 1] is the count
            // right after the FOLLOWING turn, which is when the backend OBSERVE
            // step would have processed the user's reply to this question. An
            // increase between those two snapshots means this exact occurrence
            // is the one that got answered — not an earlier or later re-ask.
            const liveOffset = assistantOrdinal - historyAssistantCount;
            const countBefore = mcTimeline[liveOffset];
            const countAfter = mcTimeline[liveOffset + 1];
            if (countBefore !== undefined && countAfter !== undefined && countAfter === countBefore + 1) {
                answeredIndex = countBefore;
            }
        } else {
            // Best-effort fallback for the pre-session history prefix.
            answeredIndex = historyQuizIndex;
            historyQuizIndex += 1;
        }

        const answered = answeredIndex !== null ? mcObservation?.questions?.[answeredIndex] : undefined;

        return {
            isQuizQuestion: true,
            selectedAnswer: answered ? Number(answered.userAnswer) : null,
            readOnly: !!answered || !isActiveTurn,
            isActive: isActiveTurn && !answered,
        };
    });
}

export default function QuizQuickReplies({ onSelect, disabled, selectedAnswer = null, readOnly = false }: {
    onSelect: (text: string) => void;
    disabled?: boolean;
    /** 1-based answer (matches the option's leading number) already recorded for this question, if any. */
    selectedAnswer?: number | null;
    /** True once this question has been answered — locks the chips and just shows the pick. */
    readOnly?: boolean;
}) {
    return (
        <div className="ml-10 flex flex-wrap gap-2">
            {QUIZ_OPTIONS.map((option, i) => {
                const isSelected = selectedAnswer === i + 1;
                return (
                    <button
                        key={option}
                        type="button"
                        disabled={readOnly || disabled}
                        onClick={() => onSelect(option)}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-colors disabled:cursor-default ${isSelected
                            ? "border-blue-500 bg-blue-500 text-white"
                            : readOnly
                                ? "border-zinc-200 text-zinc-400 bg-zinc-50"
                                : "border-zinc-300 text-zinc-700 bg-white hover:border-blue-400 hover:text-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}
