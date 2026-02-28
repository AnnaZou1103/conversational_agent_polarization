import { ValidState } from "@/src/types/interfaces";


export const statePath: Record<ValidState, string> = {
    not_started: "consent",
    pre_survey: "pre-survey",
    to_intervention: "to-intervention",
    intervention: "intervention",
    to_post_survey: "to-post-survey",
    post_survey: "post-survey",
    complete: "thankyou",
};