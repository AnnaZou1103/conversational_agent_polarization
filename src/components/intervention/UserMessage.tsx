export default function UserMessage({ message }: { message: string; }) {
    return (
        <div className="flex justify-end">
            <div className="
                max-w-[70%]
                rounded-2xl rounded-br-sm
              bg-blue-600 text-white
                px-4 py-2
                text-sm leading-relaxed
                wrap-break-word
            ">
                {message}
            </div>
        </div>
    );
}