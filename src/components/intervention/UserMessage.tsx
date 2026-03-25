import { Message } from "@/src/types/interfaces";

export default function UserMessage({ message }: { message: Message; }) {
    return (
        <div className="flex justify-end">
            <div className="
                max-w-[70%]
                rounded-2xl rounded-br-sm
              bg-black text-white
                px-4 py-2
                text-sm leading-relaxed
                whitespace-pre-wrap
            ">
                {message.content}
            </div>
        </div>
    );
}