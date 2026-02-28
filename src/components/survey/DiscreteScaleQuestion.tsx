'use client';

import { useEffect, useState } from "react";
import QuestionCard from "../common/QuestionCard";

export default function DiscreteScaleQuestion({
    name,
    question,
    valueLabels,
    initialIndex,
    selectedValue
}: {
    name: string,
    question: string,
    valueLabels: string[],
    initialIndex: number,
    selectedValue?: string;
}) {
    const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
    const currentLabel = valueLabels[currentIndex];
    const labelCount = valueLabels.length;


    const minIndex = Math.min(currentIndex, initialIndex);
    const maxIndex = Math.max(currentIndex, initialIndex);

    const isActiveIndex = (index: number) => {
        return index >= minIndex && index <= maxIndex;
    };

    const leftPercent = (minIndex / (labelCount - 1)) * 100;
    const rightPercent = (maxIndex / (labelCount - 1)) * 100;
    const widthPercent = rightPercent - leftPercent;

    useEffect(() => {
        if (selectedValue) {
            const index = valueLabels.findIndex(label => label.toString() === selectedValue);
            if (index !== -1) setCurrentIndex(index);
        }
    }, [selectedValue, valueLabels]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <QuestionCard question={question}>

            <input
                type="hidden"
                name={name}
                value={currentLabel}
                required={true}
            />

            <div className="mt-4 space-y-4">
                <div className="text-center">
                    <span className="text-xl font-semibold text-blue-600">
                        {currentLabel}
                    </span>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-zinc-200 rounded-full -translate-y-1/2" />

                    {currentIndex !== initialIndex && (
                        <div
                            className="absolute top-1/2 h-2 bg-blue-600 rounded-full -translate-y-1/2 transition-all duration-200"
                            style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`,
                            }}
                        />
                    )}

                    <div className="relative flex justify-between items-center">
                        {valueLabels.map((label, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleDotClick(index)}
                                className={`
                                    relative z-10 w-5 h-5 rounded-full border-3 transition-all duration-200
                                    ${isActiveIndex(index)
                                        ? 'bg-blue-600 border-blue-600 scale-110'
                                        : 'bg-white border-zinc-300 hover:border-blue-400 hover:scale-105'}
                                    cursor-pointer shadow-md
                                `}
                                aria-label={`Select ${label}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-between text-sm font-medium text-zinc-800">
                    <span>{valueLabels[0]}</span>
                    <span>{valueLabels[labelCount - 1]}</span>
                </div>
            </div>
        </QuestionCard>
    );
}