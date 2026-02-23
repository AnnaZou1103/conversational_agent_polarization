import { ReactNode } from "react";

export interface InstructionItem {
    title: string;
    titleSize?: "xl" | "2xl" | "3xl";
    content: ReactNode;
}

export type SurveyType = "pre" | "post";
export type ValidState = "not_started" | "pre_survey" | "intervention" | "post_survey" | "complete";

export interface UserState {
    state: ValidState;
}

export interface SurveyResponses {
    responses: Record<string, string>;
}

export interface BaseQuestion {
    name: string;
    question: string;
}

export interface ChoiceQuestion extends BaseQuestion {
    type: "choice";
    options: string[];
}

export interface RatingQuestion extends BaseQuestion {
    type: "rating";
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
    allowNotApplicable?: boolean;
}

export interface DiscreteScaleQuestion extends BaseQuestion {
    type: "scale";
    isDiscrete: true;
    valueLabels: string[];
    initialIndex: number;
}

export interface ContinuousScaleQuestion extends BaseQuestion {
    type: "scale";
    isDiscrete: false;
    min: number;
    max: number;
    milestones: { value: number; label: string; }[];
}

export interface LikertQuestion {
    type: "likert";
    name: string;
    min: number;
    max: number;
    statements: {
        name: string;
        content: string;
    }[];
}

export type SurveyQuestion =
    | ChoiceQuestion
    | DiscreteScaleQuestion
    | ContinuousScaleQuestion
    | RatingQuestion
    | LikertQuestion;

export interface SurveyPage {
    questions: SurveyQuestion[];
    instruction?: string;
}