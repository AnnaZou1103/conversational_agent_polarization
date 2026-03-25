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
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ children }) => <span>{children}</span>
                    }}>
                    {message.content}
                </ReactMarkdown>
                {message.status === "streaming" && <span className="animate-pulse">▌</span>}
            </div>
        </div>
    );
}