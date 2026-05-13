import { ReactNode } from "react";

export interface ConsentFormItem {
    title: string;
    content: ReactNode;
}

export type SurveyType = "pre" | "post";
export type State = "not_started" | "pre_survey" | "to_intervention" | "intervention" | "to_post_survey" | "post_survey" | "complete";
export type Type = "study" | "experiment";
export type Party = "democrat" | "republican";
export type Strategy = "common_identity" | "personal_narrative" | "misperception_correction" | "control" | "control_politics";
export type APIStrategy = "common-identity" | "personal-narrative" | "misperception-correction" | "control" | "control-politics";
export const ModelToCondition: Record<Strategy, APIStrategy> = {
    "common_identity": "common-identity",
    "personal_narrative": "personal-narrative",
    "misperception_correction": "misperception-correction",
    "control": "control",
    "control_politics": "control-politics"
};

export interface UserState {
    state: State;
}

export interface StudyType {
    type: Type;
}

export interface UserParty {
    party: Party;
}

export interface AgentStrategy {
    strategy: Strategy;
}

export interface CIObservation {
    showSurvey: boolean;
    surveyText: string;
    userFeelingText: string | null;
    userMediaText: string | null;
}

export interface PNObservation {
    personLabel: string | null;
    personTraits: string[];
    personCaresAbout: string[];
    personMemories: string[];
    personPoliticalOrigin: string | null;
}

export interface QuizQuestion {
    label: string;
    userAnswer: number;
    surveyAverage: number;
}

export interface MCObservation {
    questions: QuizQuestion[];
}

export interface ControlObservation {
    topicsShared: string[];
    currentMood: string | null;
}

export interface ChatObservation {
    stage: string;
    observation: CIObservation | PNObservation | MCObservation | ControlObservation;
}


export interface SurveyResponses {
    responses: Record<string, string>;
}

export interface BaseQuestion {
    name: string;
    question: string;
    showIf?: (responses: Record<string, string>) => boolean;
    hidden?: boolean;
    questionLabel?: string;
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
    hidden?: boolean;
    questionLabel?: string;
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
    model?: APIStrategy;
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