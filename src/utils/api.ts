import { SurveyResponses, SurveyType, UserState } from "../types/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const userAPI = {
    validateStudyID: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/validate/${id}`);
        return response;
    },
    getUserState: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/state/${id}`);
        return response;
    },
    advanceUserState: async (id: string, nextState: UserState) => {
        const response = await fetch(`${apiUrl}/user/advance/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nextState),
        });
        if (!response.ok) throw new Error('Failed to advance user');
        return await response.json();
    }
};

const surveyAPI = {
    saveSurvey: async (id: string, surveyType: SurveyType, responses: SurveyResponses) => {
        const response = await fetch(`${apiUrl}/survey/${surveyType}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(responses),
        });
        if (!response.ok) throw new Error('Failed to save survey');
        return await response.json();
    }
};

export default {
    user: userAPI,
    preSurvey: surveyAPI
};