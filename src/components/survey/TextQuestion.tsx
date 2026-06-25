import QuestionCard from "../common/QuestionCard";

export default function TextQuestion({
    name,
    question,
    placeholder = "Please share your thoughts here...",
    selectedValue
}: {
    name: string,
    question: string,
    placeholder?: string,
    selectedValue?: string;
}) {
    return (
        <QuestionCard question={question}>
            <textarea
                suppressHydrationWarning
                name={name}
                defaultValue={selectedValue ?? ""}
                placeholder={placeholder}
                rows={4}
                required={true}
                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
        </QuestionCard>
    );
}
