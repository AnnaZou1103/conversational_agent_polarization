import { ControlObservation } from "@/src/types/interfaces";

export default function PoliticsControlCard({ observation }: { observation: ControlObservation; }) {
    const topicsShared = observation.topicsShared;
    const currentMood = observation.currentMood;

    const hasContent = topicsShared.length > 0 || currentMood;
    if (!hasContent) return null;


    return (
        <div
            className="manipulation-card-container"
        >
            <div
                className="text-xs tracking-widest text-zinc-500 font-bold mb-4 pb-4 border-b border-zinc-200"
            >
                Conversation Summary
            </div>

            {currentMood && (
                <div className={topicsShared.length > 0 ? "mb-4" : "mb-0"}>
                    <div className="mb-2 text-xs tracking-[0.08em] text-[#3a3a3a] font-semibold">
                        Your overall take
                    </div>
                    <p className="m-0 border-l-2 border-zinc-300 pl-3 text-[13px] italic leading-normal text-black">
                        "{currentMood}"
                    </p>
                </div>
            )}

            {topicsShared.length > 0 && (
                <div>
                    <div className="mb-2 text-xs tracking-[0.08em] text-[#3a3a3a] font-semibold">
                        Topics you've raised
                    </div>
                    <ul className="m-0 list-disc list-inside p-0">
                        {topicsShared.map((topic, i) => (
                            <li
                                key={i}
                                className="mb-1.5 pl-2.5 text-xs leading-normal text-black"
                            >
                                {topic}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}