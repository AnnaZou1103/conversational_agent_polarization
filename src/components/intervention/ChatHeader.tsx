import AgentIcon from "./AgentIcon";

export default function ChatHeader() {
    return (
        <section className="border-b border-zinc-200 rounded-t-xl bg-white px-4 py-4">
            <div className="flex gap-6">
                <AgentIcon width={34} height={34} />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                        Assistant
                    </span>
                    <span className="text-[13px] text-zinc-400">
                        Online
                    </span>
                </div>
            </div>
        </section>
    );
}