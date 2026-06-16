import QuestionCard from "../common/QuestionCard";

export default function RatingQuestion({
    name,
    question,
    min,
    max,
    minLabel = "",
    maxLabel = "",
    allowNotApplicable = false,
    selectedValue
}: {
    name: string,
    question: string,
    min: number,
    max: number,
    minLabel?: string,
    maxLabel?: string,
    allowNotApplicable?: boolean,
    selectedValue?: string;
}) {
    return (
        <QuestionCard question={question}>
            <div className="overflow-x-auto">
            <div className="min-w-[640px] flex items-center justify-between border-0 rounded-full bg-blue-50 px-4 py-2">
                <span className="text-sm font-semibold text-zinc-800">{min} = {minLabel}</span>
                <div className="flex justify-between items-center space-x-12">
                    {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((value) => (
                        <label key={value} className="flex flex-col items-center cursor-pointer space-y-2">
                            <span className="text-sm text-zinc-600">{value}</span>
                            <input
                                type="radio"
                                name={name}
                                value={value}
                                required={true}
                                defaultChecked={value.toString() === selectedValue}
                                className="w-4 h-4 text-blue-600 mb-1 cursor-pointer"
                            />
                        </label>
                    ))}
                </div>
                <span className="text-sm font-semibold text-zinc-800 ml-6">{max} = {maxLabel}</span>
            </div>
            </div>

            {allowNotApplicable &&
                <label key="Not applicable" className="flex items-center justify-start cursor-pointer space-x-2 mt-3 ml-3">
                    <input
                        type="radio"
                        name={name}
                        value={"Not Applicable"}
                        required={true}
                        defaultChecked={"Not Applicable" === selectedValue}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-zinc-800">Not applicable</span>
                </label>
            }
        </QuestionCard>
    );
}