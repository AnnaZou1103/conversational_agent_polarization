import { CIObservation } from "@/src/types/interfaces";
import React from "react";

export default function CommonIdentityCard({ observation }: { observation: CIObservation; }) {
    const userFeelingText = observation.userFeelingText;
    const userMediaText = observation.userMediaText;
    const showSurvey = observation.showSurvey;
    const surveyText = observation.surveyText;

    const hasAnyContent = userFeelingText || userMediaText || showSurvey;
    if (!hasAnyContent) return null;

    return (
        <div className="manipulation-card-container">
            <header className="mb-4 pb-4 border-b border-zinc-200 text-xs tracking-widest text-zinc-500 font-bold">
                Conversation Summary
            </header>

            {/* User's feeling */}
            {userFeelingText && (
                <DataRow label="How you feel">
                    "{userFeelingText}"
                </DataRow>
            )}

            {/* User's media source */}
            {userMediaText && (
                <DataRow label="Where you get your info">
                    "{userMediaText}"
                </DataRow>
            )}

            {/* Divider before survey finding */}
            {showSurvey && (userFeelingText || userMediaText) && (
                <div className="my-4 border-t border-zinc-200" />
            )}

            {/* Survey finding */}
            {showSurvey && surveyText && (
                <div className="p-4 bg-[#EAECFC] rounded-xl border border-[#9E9DC9]">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[#7570C6] font-bold">
                        What surveys found
                    </div>
                    <p className="m-0 text-[13px] leading-[1.65] text-[#5A5599]">
                        {surveyText}
                    </p>
                </div>
            )}
        </div>
    );
}

function DataRow({ label, children }: { label: string, children: React.ReactNode; }) {
    return (
        <div className="mb-3.5">
            <div className="mb-2 text-xs tracking-[0.08em] text-[#3a3a3a] font-semibold">
                {label}
            </div>
            <p className="m-0 border-l-2 border-zinc-300 pl-3 text-[13px] italic leading-[1.55] text-[#3a3a3a]">
                {children}
            </p>
        </div>
    );
}
