"use client";


import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ChoiceQuestion from "@/src/components/survey/ChoiceQuestion";
import RatingQuestion from "@/src/components/survey/RatingQuestion";
import ScaleQuestion from "@/src/components/survey/ScaleQuestion";
import { SurveyQuestion, SurveyType, State, Party } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import LikertQuestion from "./LikertQuestion";
import TextQuestion from "./TextQuestion";
import { routeToState } from "@/src/lib/state/client";
import { applyParty, shuffleWithSeed } from "@/src/lib/utils";
import { useProgress } from "../layout/ProgressContext";
import { getStepOffset } from "@/src/config/progressConfig";
import { postSurveyPages, preSurveyPages } from "@/src/config/surveyConfig";



export default function Survey({ id, surveyType, party }: { id: string, surveyType: SurveyType, party?: Party; }) {
    const normalizePartyChoice = (choice?: string): Party | undefined => {
        if (!choice || choice === "Independent/Other") return undefined;
        return choice.toLowerCase() as Party;
    };

    const [pages] = useState(() => {
        const rawPages = surveyType === "pre" ? preSurveyPages : postSurveyPages;

        return rawPages.map((p, pageIndex) => {
            let questions = p.questions.map((q, questionIndex) => {
                if (q.type === "choice" && q.randomized) {
                    const seed = `${id}|${surveyType}|${pageIndex}|${questionIndex}|${q.name}|options`;
                    return { ...q, options: shuffleWithSeed(q.options, seed) };
                }
                return q;
            });

            if (p.randomized) {
                const pageSeed = `${id}|${surveyType}|${pageIndex}|questions`;
                questions = shuffleWithSeed(questions, pageSeed);
            }

            return {
                ...p,
                questions,
            };
        });
    });

    const router = useRouter();

    const nextState: Record<SurveyType, State> = { "pre": "to_intervention", "post": "complete" };

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [responses, setResponses] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [effectiveParty, setEffectiveParty] = useState<Party | undefined>(party);

    const { setCurrentStep } = useProgress();

    const questionNumberMap = useMemo(() => {
        const map: Record<string, number | string> = {};
        let counter = 1;
        pages.forEach(page => {
            page.questions.forEach(q => {
                if (q.hidden) return;
                if (q.questionLabel) {
                    map[q.name] = q.questionLabel;
                } else {
                    map[q.name] = counter++;
                }
            });
        });
        return map;
    }, [pages]);

    const visibleQuestions = pages[currentPage].questions.filter(
        q => !q.hidden && (!q.showIf || q.showIf(responses))
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        setCurrentStep(getStepOffset(`${surveyType}-survey`) + currentPage + 1);
    }, [currentPage, surveyType]);

    const submitSurvey = async (finalResponses: Record<string, string>, resolvedParty: Party | undefined) => {
        setIsSubmitting(true);
        try {
            await api.survey.saveSurvey(id, surveyType, { responses: finalResponses });
            if (surveyType === "pre")
                await api.user.saveUserParty(id, { party: resolvedParty! });
            await routeToState(router, id, nextState[surveyType]);
        } catch (error) {
            console.error('Error submitting survey:', error);
            router.push(`/${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNextClick = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newResponses = { ...responses };
        pages[currentPage].questions.forEach(q => {
            if (q.type === "likert") {
                q.statements!.forEach(statement => {
                    const value = formData.get(statement.name) as string;
                    if (value) newResponses[statement.name] = value;
                });
            } else if (q.type === "text") {
                const value = formData.get(q.name!) as string;
                newResponses[q.name!] = value ?? "";
            } else {
                const value = formData.get(q.name!) as string;
                if (value) newResponses[q.name!] = value;
            }
        });

        // Clear responses for questions that are now hidden
        pages[currentPage + 1]?.questions.forEach(q => {
            if (q.showIf && !q.showIf(newResponses)) {
                delete newResponses[q.name];
            }
        });

        // End if no partisanship — screen out and show the screened-out final page
        if (newResponses["partyIdentification"] === "Independent/Other" && Number(newResponses["closerParty"]) === 0) {
            await api.user.advanceUserState(id, { state: "complete" });
            router.push(`/${id}/thankyou?screened=1`);
            return;
        }

        // Track effective party
        let resolvedParty = effectiveParty;
        const partyChoice = newResponses["partyIdentification"];
        const normalizedPartyChoice = normalizePartyChoice(partyChoice);
        if (normalizedPartyChoice) {
            resolvedParty = normalizedPartyChoice;
        } else if (newResponses["closerParty"]) {
            resolvedParty = Number(newResponses["closerParty"]) > 0 ? "democrat" : "republican";
        }
        setEffectiveParty(resolvedParty);

        setResponses(newResponses);

        if (currentPage !== pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            submitSurvey(newResponses, resolvedParty);
        }
    };

    const applyPartyToQuestion = (q: SurveyQuestion): SurveyQuestion => {
        if (q.type === "likert" || q.type === "text" || !effectiveParty) return q;
        return { ...q, question: applyParty(q.question, effectiveParty!) };
    };

    const withNumber = (q: SurveyQuestion): SurveyQuestion => {
        if (q.type === "likert") return q;
        const num = questionNumberMap[q.name];
        if (num === undefined) return q;
        const prefix = typeof num === "string" ? `${num}. ` : `Q${num}. `;
        return { ...q, question: `${prefix}${q.question}` };
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
                return (
                    <ScaleQuestion
                        key={q.name}
                        name={q.name}
                        question={q.question}
                        min={q.min}
                        max={q.max}
                        milestones={q.milestones}
                        displayValue={q.displayValue}
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

            case "text":
                return (
                    <TextQuestion
                        key={q.name}
                        name={q.name}
                        question={q.question}
                        placeholder={q.placeholder}
                        selectedValue={responses[q.name]}
                    />
                );
        }
    };


    return (
        <main className="mx-auto my-10 w-[760px] min-w-[760px] space-y-6">
            {pages[currentPage].paragraph && effectiveParty &&
                <p className="text-question whitespace-pre-line">
                    {applyParty(pages[currentPage].paragraph, effectiveParty)}
                </p>}


            <form onSubmit={handleNextClick} className="space-y-6">
                {visibleQuestions.map(q => renderQuestion(withNumber(applyPartyToQuestion(q))))}
                <div className={`flex ${currentPage > 0 ? "justify-between" : "justify-end"}`}>
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
                            : currentPage < pages.length - 1 ? "Next" : "Submit"}
                    </button>
                </div>
            </form>
        </main>
    );
}
