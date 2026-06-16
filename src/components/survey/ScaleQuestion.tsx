'use client';

import { ReactNode, useEffect, useState } from "react";
import QuestionCard from "../common/QuestionCard";

export default function ScaleQuestion({
    name,
    question,
    min,
    max,
    milestones,
    displayValue,
    selectedValue
}: {
    name: string,
    question: string,
    min: number,
    max: number,
    milestones: { value: number; label: string; }[];
    displayValue?: (value: number) => ReactNode;
    selectedValue?: string;
}) {
    const initialValue = min <= 0 && max >= 0 ? 0 : min;
    const [currentValue, setCurrentValue] = useState<number>(initialValue);

    useEffect(() => {
        if (selectedValue !== undefined) {
            setCurrentValue(Number(selectedValue));
        } else {
            setCurrentValue(initialValue);
        }
    }, [selectedValue, initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(Number(e.target.value));
    };

    // The percentage of current value on the bar
    const valuePercent = ((currentValue - min) / (max - min)) * 100;
    // The percentage of 0 point on the bar
    const zeroPercent = ((0 - min) / (max - min)) * 100;
    // If both min and max are negative or position
    // CSS will break, so we need to clamp zero point to safe range (0 ~ 100)
    const clampedZeroPercent = Math.max(0, Math.min(100, zeroPercent));

    const sliderBackgroundColor = "#e5e7eb";
    const sliderBarColor = "#2563eb";
    let background = sliderBackgroundColor;

    // We start from internal point
    if (min <= 0 && max >= 0) {
        if (currentValue > 0) {
            background = `linear-gradient(
                to right,
                ${sliderBackgroundColor} 0%,
                ${sliderBackgroundColor} ${clampedZeroPercent}%,
                ${sliderBarColor} ${clampedZeroPercent}%,
                ${sliderBarColor} ${valuePercent}%,
                ${sliderBackgroundColor} ${valuePercent}%,
                ${sliderBackgroundColor} 100%
            )`;
        } else if (currentValue < 0) {
            background = `linear-gradient(
                to right,
                ${sliderBackgroundColor} 0%,
                ${sliderBackgroundColor} ${valuePercent}%,
                ${sliderBarColor} ${valuePercent}%,
                ${sliderBarColor} ${clampedZeroPercent}%,
                ${sliderBackgroundColor} ${clampedZeroPercent}%,
                ${sliderBackgroundColor} 100%
            )`;
        }
    } else {
        background = `linear-gradient(
            to right,
            ${sliderBarColor} 0%,
            ${sliderBarColor} ${valuePercent}%,
            ${sliderBackgroundColor} ${valuePercent}%,
            ${sliderBackgroundColor} 100%
        )`;
    }

    return (
        <QuestionCard question={question}>
            <input
                type="hidden"
                name={name}
                value={currentValue}
                required={true}
            />

            <div className="mt-4 mx-2 sm:mx-20 space-y-4">
                {displayValue ? displayValue(currentValue) : (
                    <div className="text-center">
                        <span className="text-xl font-semibold text-blue-600">
                            {Math.abs(currentValue)}
                        </span>
                    </div>
                )}


                <input
                    type="range"
                    min={min}
                    max={max}
                    value={currentValue}
                    onChange={handleChange}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ background }}
                />

                <div className="relative h-16 sm:h-12">
                    {milestones.map((milestone, index) => {
                        const position = ((milestone.value - min) / (max - min)) * 100;
                        const isFirst = index === 0;
                        const isLast = index === milestones.length - 1;
                        // Edge-align the end labels so they stay within the track bounds
                        const transform = isFirst ? "none" : isLast ? "translateX(-100%)" : "translateX(-50%)";
                        const align = isFirst ? "text-left" : isLast ? "text-right" : "text-center";
                        return (
                            <div
                                key={index}
                                className={`absolute max-w-[6rem] sm:max-w-none ${align}`}
                                style={{ left: `${position}%`, transform }}
                            >
                                <div className="text-xs sm:text-sm text-zinc-600">
                                    {Math.abs(milestone.value)}
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-zinc-800 whitespace-normal sm:whitespace-pre">
                                    {milestone.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </QuestionCard>
    );
}