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
    screened?: boolean;
    screenReason?: string[];
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
    userFeelingText: string | null;
    userMediaText: string | null;
    additionalCommonGroundText: string | null;
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
    userAnswer: number | string;
    surveyAverage: number | string;
}

export interface MCObservation {
    questions: QuizQuestion[];
}

export interface ControlObservation {
    topicsShared: string[];
    currentMood: string | null;
    mainTakeaway: string | null;
}

export interface ControlPoliticsObservation {
    topicsShared: string[];
    currentMood: string | null;
    mainConcern: string | null;
}

export interface ChatObservation {
    stage: string;
    observation: CIObservation | PNObservation | MCObservation | ControlObservation | ControlPoliticsObservation;
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
    question?: string;
    min: number;
    max: number;
    milestones?: { value: number; label: string; }[];
    statements: {
        name: string;
        content: string;
    }[];
    showIf?: (responses: Record<string, string>) => boolean;
    hidden?: boolean;
    questionLabel?: string;
    randomized?: boolean;
    size?: "sm" | "lg";
    // "grid" (default) renders a radio button per scale point. "slider" renders
    // one draggable track per statement, suitable for wide ranges (e.g. 0-100).
    variant?: "grid" | "slider";
    step?: number;
}

export interface TextQuestion extends BaseQuestion {
    type: "text";
    placeholder?: string;
}

export interface SemanticDifferentialQuestion {
    type: "semanticDifferential";
    name: string;
    question?: string;
    min: number;
    max: number;
    milestones?: { value: number; label: string; }[];
    statements: {
        name: string;
        leftLabel: string;
        rightLabel: string;
    }[];
    showIf?: (responses: Record<string, string>) => boolean;
    hidden?: boolean;
    questionLabel?: string;
    randomized?: boolean;
}

export type SurveyQuestion =
    | ChoiceQuestion
    | ScaleQuestion
    | RatingQuestion
    | LikertQuestion
    | TextQuestion
    | SemanticDifferentialQuestion;

export interface SurveyPage {
    questions: SurveyQuestion[];
    paragraph?: string;
    bullets?: string[];
    randomized?: boolean;
}

export interface ChatRequest {
    message: string;
    model?: APIStrategy;
    // Misperception-correction quiz: the Likert value (1-4) the participant
    // clicked for the current question. Sent so the backend records the score
    // from the actual UI selection instead of re-extracting it from text.
    quizAnswer?: number;
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