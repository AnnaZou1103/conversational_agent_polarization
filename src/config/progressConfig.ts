import { postSurveyPages, preSurveyPages } from "./surveyConfig";

export const PROGRESS_STEPS = [
    { key: "consent", steps: 1 },
    { key: "pre-survey", steps: preSurveyPages.length },
    { key: "to-intervention", steps: 1 },
    { key: "intervention", steps: 1 },
    { key: "to-post-survey", steps: 1 },
    { key: "post-survey", steps: postSurveyPages.length },
    { key: "thankyou", steps: 1 },
];

export const TOTAL_STEPS = PROGRESS_STEPS.reduce((sum, s) => sum + s.steps, 0);

export function getStepOffset(key: string): number {
    console.log(key);
    let offset = 0;
    for (const s of PROGRESS_STEPS) {
        if (s.key === key) return offset;
        offset += s.steps;
    }
    return 0;
}