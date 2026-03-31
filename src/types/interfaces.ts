import { ReactNode } from "react";

export interface ConsentFormItem {
    title: string;
    content: ReactNode;
}

export type SurveyType = "pre" | "post";
export type State = "not_started" | "pre_survey" | "to_intervention" | "intervention" | "to_post_survey" | "post_survey" | "complete";
export type Party = "Democrat" | "Republican";

export interface UserState {
    state: State;
}

export interface UserParty {
    party: Party;
}

export interface SurveyResponses {
    responses: Record<string, string>;
}

export interface BaseQuestion {
    name: string;
    question: string;
    showIf?: (responses: Record<string, string>) => boolean;
}

export interface ChoiceQuestion extends BaseQuestion {
    type: "choice";
    options: string[];
    randomized?: boolean;
}

export interface RatingQuestion extends BaseQuestion {
    type: "rating";
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
    allowNotApplicable?: boolean;
}

export interface ScaleQuestion extends BaseQuestion {
    type: "scale";
    min: number;
    max: number;
    milestones: { value: number; label: string; }[];
    displayValue?: (value: number) => ReactNode;
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
    showIf?: (responses: Record<string, string>) => boolean;
}

export type SurveyQuestion =
    | ChoiceQuestion
    | ScaleQuestion
    | RatingQuestion
    | LikertQuestion;

export interface SurveyPage {
    questions: SurveyQuestion[];
    paragraph?: string;
    randomized?: boolean;
}

export interface ChatRequest {
    message: string;
    model?: "common-identity" | "personal-narrative" | "misperception-correction";
}

export interface ChatResponse {
    type: "token" | "done";
    content: string;
    conversationComplete?: boolean;
    stage?: string | null;
}

export type Message = {
    role: "user" | "assistant",
    content: string,
    status?: "streaming" | "done";
};