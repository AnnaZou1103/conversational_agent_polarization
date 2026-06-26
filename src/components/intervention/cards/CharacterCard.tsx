import { PNObservation } from "@/src/types/interfaces";
import type { ReactNode } from "react";


export default function CharacterCard({ observation }: { observation: PNObservation; }) {
    const personLabel = observation.personLabel;
    const personTraits = observation.personTraits;
    const personCaresAbout = observation.personCaresAbout;
    const personMemories = observation.personMemories;
    const personPoliticalOrigin = observation.personPoliticalOrigin;

    return (
        <div className="manipulation-card-container">
            {/* Title */}
            <div className="mb-4 pb-4 border-b border-zinc-200 text-xs tracking-widest text-zinc-500 font-bold">
                Conversation Summary
            </div>

            {/* Name / label */}
            <header className="mb-4 pb-4 border-b border-zinc-200">
                <div className="text-xs font-semibold capitalize text-black">
                    {personLabel ?? "—"}
                </div>
                <p className="m-0 mt-1 text-[12px] leading-snug text-zinc-500">
                    A person from the other political party who came up in your conversation.
                </p>
            </header>

            {/* Traits */}
            {personTraits.length > 0 && (
                <Section label="Personality">
                    <TagList items={personTraits} color="#a78bfa" />
                </Section>
            )}

            {/* Cares about */}
            {personCaresAbout.length > 0 && (
                <Section label="Cares about">
                    <TagList items={personCaresAbout} color="#60a5fa" />
                </Section>
            )}

            {/* Memories */}
            {personMemories.length > 0 && (
                <Section label="Moments">
                    <ul className="m-0 list-none p-0">
                        {personMemories.map((m, i) => (
                            <li
                                key={i}
                                className="mb-1.5 border-l-2 border-zinc-300 pl-3 text-[12px] leading-normal text-black"
                            >
                                {m}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* Political origin */}
            {personPoliticalOrigin && (
                <Section label="Why they think this way">
                    <p className="m-0 text-[12px] leading-[1.6] text-[#777]">
                        {personPoliticalOrigin}
                    </p>
                </Section>
            )}
        </div>
    );
}

function Section({ label, children }: { label: string, children: ReactNode; }) {
    return (
        <div className="mb-4">
            <div className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#3a3a3a]">
                {label}
            </div>
            {children}
        </div>
    );
}

function TagList({ items, color }: { items: string[], color: string; }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
                <span
                    key={i}
                    className="rounded-[20px] border px-2.5 py-0.75 text-[12px] font-semibold"
                    style={{
                        color,
                        background: `${color}14`,
                        borderColor: `${color}33`,
                    }}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}
