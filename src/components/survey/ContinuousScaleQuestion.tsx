'use client';

import { useEffect, useState } from "react";

export default function ContinuousScaleQuestion({
    name,
    question,
    min,
    max,
    milestones,
    selectedValue
}: {
    name: string,
    question: string,
    min: number,
    max: number,
    milestones: { value: number; label: string; }[];
    selectedValue?: string;
}) {
    const [currentValue, setCurrentValue] = useState<number>(min);
    const percentage = ((currentValue - min) / (max - min)) * 100;

    useEffect(() => {
        if (selectedValue) {
            setCurrentValue(Number(selectedValue));
        }
    }, [selectedValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(Number(e.target.value));
    };

    return (
        <fieldset className="border border-zinc-300 px-4 pt-3 pb-4">
            <legend className="px-2 text-lg font-medium whitespace-pre-line">
                {question}
            </legend>

            <input
                type="hidden"
                name={name}
                value={currentValue}
                required={true}
            />

            <div className="mt-4 mx-20 space-y-4">
                <div className="text-center">
                    <span className="text-xl font-semibold text-blue-600">
                        {currentValue}
                    </span>
                </div>

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={currentValue}
                    onChange={handleChange}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                    }}
                />

                <div className="relative h-12">
                    {milestones.map((milestone, index) => {
                        const position = ((milestone.value - min) / (max - min)) * 100;
                        return (
                            <div
                                key={index}
                                className="absolute -translate-x-1/2 text-center whitespace-nowrap"
                                style={{ left: `${position}%` }}
                            >
                                <div className="text-sm text-zinc-600">
                                    {milestone.value}
                                </div>
                                <div className="text-sm font-semibold text-zinc-800 whitespace-pre">
                                    {milestone.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </fieldset>
    );
}