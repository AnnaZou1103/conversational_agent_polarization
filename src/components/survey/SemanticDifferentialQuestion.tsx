import QuestionCard from "../common/QuestionCard";

export default function SemanticDifferentialQuestion({
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
    statements: { name: string, leftLabel: string, rightLabel: string; }[];
    responses?: Record<string, string>;
    randomized?: boolean;
}) {
    const scale = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const labelByValue = new Map(milestones?.map(m => [m.value, m.label]));
    const center = (min + max) / 2;
    const gridTemplateColumns = `minmax(85px, 1fr) repeat(${scale.length}, minmax(48px, 1fr)) minmax(85px, 1fr)`;
    return (
        <QuestionCard question={question ?? ""}>
            <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                    <div
                        className="grid items-end gap-1 mb-3"
                        style={{ gridTemplateColumns }}
                    >
                        <div />
                        {scale.map(value => (
                            <div key={value} className="text-center">
                                <div className="text-sm font-semibold text-zinc-600">{Math.abs(value - center)}</div>
                                {labelByValue.has(value) &&
                                    <div className="text-xs text-zinc-500 mt-0.5 leading-tight">{labelByValue.get(value)}</div>}
                            </div>
                        ))}
                        <div />
                    </div>

                    {statements.map((statement, index) => (
                        <div
                            key={index}
                            className="grid items-center gap-1 py-1 pl-2"
                            style={{ gridTemplateColumns, backgroundColor: index % 2 ? "" : "#F5F5F5" }}
                        >
                            <div className="text-right pr-2 text-sm whitespace-nowrap">{statement.leftLabel}</div>

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

                            <div className="pl-2 text-sm whitespace-nowrap">{statement.rightLabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </QuestionCard>
    );
}
