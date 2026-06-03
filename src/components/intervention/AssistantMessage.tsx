import { Message } from "@/src/types/interfaces";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AgentIcon from "./AgentIcon";

export default function AssistantMessage({ message }: { message: Message; }) {
    return (
        <div className="flex justify-start items-end gap-3">
            <AgentIcon width={25} height={25} />
            <div className="
                max-w-[70%]
                rounded-2xl rounded-bl-sm
              bg-[#F5F5F5] text-zinc-800
                px-4 py-2
                text-sm leading-relaxed
                whitespace-pre-wrap
            ">
                {message.status === "streaming" && message.content === "" ? (
                    <span className="flex gap-1 items-center py-1">
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                ) : (
                    <>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => <span>{children}</span>,
                                ol: ({ children }) => (
                                    <ol className="list-decimal ml-4">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="mb-1">{children}</li>
                                ),
                            }}>
                            {message.content}
                        </ReactMarkdown>
                        {message.status === "streaming" && <span className="animate-pulse">▌</span>}
                    </>
                )}
            </div>
        </div>
    );
}