export default function AssistantMessage({ message }: { message: string; }) {
    return (
        <div className="flex justify-start">
            <div className="
                max-w-[70%]
                rounded-2xl rounded-bl-sm
              bg-zinc-200 text-zinc-800
                px-4 py-2
                text-sm leading-relaxed
                wrap-break-word
            ">
                {message}
            </div>
        </div>
    );
}