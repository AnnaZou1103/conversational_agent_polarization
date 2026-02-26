export default function ChoiceQuestion({
    name,
    question,
    options,
    selectedValue
}: {
    name: string,
    question: string,
    options: string[],
    selectedValue?: string;
}) {
    return (
        <div className="card-container">
            <h1 className="text-question">{question}</h1>

            <div className="space-y-2 mt-2">
                {options.map((option, _) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            required={true}
                            defaultChecked={option === selectedValue}
                            className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-base">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}