"use client";

import { checkState, routeToState } from "@/src/utils/state";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ChoiceQuestion from "@/src/components/survey/ChoiceQuestion";
import DiscreteScaleQuestion from "@/src/components/survey/DiscreteScaleQuestion";
import RatingQuestion from "@/src/components/survey/RatingQuestion";
import ContinuousScaleQuestion from "@/src/components/survey/ContinuousScaleQuestion";
import { SurveyPage, SurveyQuestion, SurveyType, ValidState } from "@/src/types/interfaces";
import api from "@/src/utils/api";
import LikertQuestion from "./LikertQuestion";

export default function Survey({ id, surveyType, surveyPage }: { id: string, surveyType: SurveyType, surveyPage: SurveyPage[]; }) {
    const router = useRouter();

    checkState(id, `${surveyType}_survey`);
    const nextState: Record<SurveyType, ValidState> = { "pre": "intervention", "post": "complete" };

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitSurvey = async (finalResponses: Record<string, string>) => {
        setIsSubmitting(true);
        try {
            await api.preSurvey.saveSurvey(id, surveyType, { responses: finalResponses });
            routeToState(id, nextState[surveyType]);
        } catch (error) {
            console.error('Error submitting survey:', error);
            router.push(`/${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNextClick = (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newResponses = { ...responses };
        surveyPage[currentPage].questions.forEach(q => {
            if (q.type === "likert") {
                q.statements!.forEach(statement => {
                    const value = formData.get(statement.name) as string;
                    if (value) newResponses[statement.name] = value;
                });
            } else {
                const value = formData.get(q.name!) as string;
                if (value) newResponses[q.name!] = value;
            }
        });
        setResponses(newResponses);

        if (currentPage !== surveyPage.length - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            submitSurvey(newResponses);
        }
    };

    const renderQuestion = (q: SurveyQuestion) => {
        switch (q.type) {

            case "choice":
                return (
                    <ChoiceQuestion
                        key={q.name}
                        name={q.name}
                        question={q.question}
                        options={q.options}
                        selectedValue={responses[q.name]}
                    />
                );

            case "scale":
                if (q.isDiscrete) {
                    return (
                        <DiscreteScaleQuestion
                            key={q.name}
                            name={q.name}
                            question={q.question}
                            valueLabels={q.valueLabels}
                            initialIndex={q.initialIndex}
                            selectedValue={responses[q.name]}
                        />
                    );
                }

                return (
                    <ContinuousScaleQuestion
                        key={q.name}
                        name={q.name}
                        question={q.question}
                        min={q.min}
                        max={q.max}
                        milestones={q.milestones}
                        selectedValue={responses[q.name]}
                    />
                );

            case "rating":
                return (
                    <RatingQuestion
                        key={q.name}
                        name={q.name}
                        question={q.question}
                        min={q.min}
                        max={q.max}
                        minLabel={q.minLabel}
                        maxLabel={q.maxLabel}
                        allowNotApplicable={q.allowNotApplicable}
                        selectedValue={responses[q.name]}
                    />
                );

            case "likert":
                return (
                    <LikertQuestion
                        key={q.name}
                        min={q.min}
                        max={q.max}
                        statements={q.statements}
                        responses={responses}
                    />
                );
        }
    };


    return (
        <main className="mx-100 my-10 space-y-6">
            <div className="mb-6">
                <p className="text-sm text-zinc-600 mb-2">Page {currentPage + 1} of {surveyPage.length}</p>
                <div className="w-full bg-zinc-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${((currentPage + 1) / surveyPage.length) * 100}%` }}
                    />
                </div>
            </div>

            <h1 className="text-3xl font-bold">{surveyType[0].toUpperCase() + surveyType.slice(1)}-Survey</h1>

            {surveyPage[currentPage].instruction &&
                <p className="text-zinc-900 font-medium whitespace-pre-line">{surveyPage[currentPage].instruction}</p>}

            <form onSubmit={handleNextClick} className="space-y-6">
                {surveyPage[currentPage].questions.map(renderQuestion)}
                <div className="space-x-10">
                    {currentPage > 0 && <button
                        type="button"
                        className="btn-zinc"
                        onClick={() => { setCurrentPage(prev => prev - 1); }}>
                        Back
                    </button>}

                    <button
                        type="submit"
                        className="btn-blue"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : currentPage < surveyPage.length - 1 ? "Next" : "Submit"}
                    </button>
                </div>
            </form>
        </main>
    );
}