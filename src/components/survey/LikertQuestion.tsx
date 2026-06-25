import QuestionCard from "../common/QuestionCard";

export default function LikertQuestion({
    question,
    min,
    max,
    milestones,
    statements,
    responses,
}: {
    question?: string,
    min: number,
    max: number,
    milestones?: { value: number, label: string; }[],
    statements: { name: string, content: string; }[];
    responses?: Record<string, string>;
    randomized?: boolean;
}) {
    const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const labelByValue = new Map(milestones?.map(m => [m.value, m.label]));
    return (
        <QuestionCard question={question ?? ""}>
            <div
                className="grid items-end gap-1 mb-3"
                style={{ gridTemplateColumns: `1fr repeat(${scale.length}, 64px)` }}
            >
                <div />
                {scale.map(value => (
                    <div key={value} className="text-center">
                        <div className="text-sm font-semibold text-zinc-600">{value}</div>
                        {labelByValue.has(value) &&
                            <div className="text-xs text-zinc-500 mt-0.5 leading-tight">{labelByValue.get(value)}</div>}
                    </div>
                ))}
            </div>

            {statements.map((statement, index) => (
                <div
                    key={index}
                    className="grid items-center gap-1 py-1 pl-2"
                    style={{ gridTemplateColumns: `1fr repeat(${scale.length}, 64px)`, backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                >
                    <div>{statement.content}</div>

                    {scale.map(value => (
                        <label key={value} className="flex flex-col items-center cursor-pointer space-y-2">
                            <input
                                type="radio"
                                suppressHydrationWarning
                                name={statement.name}
                                value={value}
                                required={true}
                                defaultChecked={responses?.[statement.name] === value.toString()}
                                className="w-4 h-4 text-blue-600 mb-1 cursor-pointer"
                            />
                        </label>
                    ))}
                </div>
            ))}
        </QuestionCard>
    );
}