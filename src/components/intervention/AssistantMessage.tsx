import { Message } from "@/src/types/interfaces";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AssistantMessage({ message }: { message: Message; }) {
    return (
        <div className="flex justify-start">
            <div className="
                max-w-[70%]
                rounded-2xl rounded-bl-sm
              bg-zinc-200 text-zinc-800
                px-4 py-2
                text-sm leading-relaxed
                whitespace-pre-wrap
            ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                </ReactMarkdown>
                {message.status === "streaming" && <span className="animate-pulse">▌</span>}
            </div>
        </div>
    );
}