import { ChatRequest, ChatResponse, SurveyResponses, SurveyType, UserParty, UserState } from "../types/interfaces";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const serverAPI = {
    getServerHealth: async () => {
        const response = await fetch(`${apiUrl}/health`);
        return response;
    },
};

const userAPI = {
    validateStudyID: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/validate/${id}`);
        return response;
    },
    getUserState: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/state/${id}`);
        return response;
    },
    getAgentStrategy: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/agent_strategy/${id}`);
        return response;
    },
    getUserParty: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/party/${id}`);
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
    },
    saveUserParty: async (id: string, userParty: UserParty) => {
        const response = await fetch(`${apiUrl}/user/party/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userParty),
        });
        if (!response.ok) throw new Error('Failed to save party');
        return await response.json();
    },
    getStudyType: async (id: string) => {
        const response = await fetch(`${apiUrl}/user/type/${id}`);
        return response;
    },
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

const chatAPI = {
    getHistory: async (id: string) => {
        const response = await fetch(`${apiUrl}/chat/history/${id}`);
        return response;
    },
    llmInference: async (id: string, chatRequest: ChatRequest, handleMessage: (data: ChatResponse) => void) => {
        const response = await fetch(`${apiUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                study_id: id,
                model: chatRequest.model ?? "common-identity",
                message: { role: "user", content: chatRequest.message },
                stream: true,
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error('Streaming failed');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Split by SSE event delimiter.
            const chunks = buffer.split("\n\n");

            // last chunk might be incomplete message (word) or empty (done)
            // we only send complete message to frontend to render
            buffer = chunks.pop() || "";
            for (const chunk of chunks) {
                if (chunk.startsWith("data: ")) {
                    const jsonStr = chunk.replace("data: ", "").trim();
                    if (!jsonStr || jsonStr === "[DONE]") continue;

                    const parsed = JSON.parse(jsonStr);
                    const choice = parsed?.choices?.[0];
                    const token = choice?.delta?.content;
                    const finishReason = choice?.finish_reason;
                    const conversationComplete = parsed?.conversation_complete;
                    const stage = parsed?.stage ?? null;

                    if (typeof token === "string" && token.length > 0) {
                        handleMessage({ type: "token", content: token });
                    }

                    if (finishReason === "stop") {
                        handleMessage({
                            type: "done",
                            content: "",
                            conversationComplete: Boolean(conversationComplete),
                            stage,
                        });
                    }
                }
            }
        }
    }
};

type newUserResponse = { id: string; };

const experimentAPI = {
    generateExperimentUser: async () => {
        const response = await fetch(`${apiUrl}/experiment/generate`, {
            method: "POST"
        });

        const data: newUserResponse = await response.json();
        return data.id;
    },
};

export default {
    server: serverAPI,
    user: userAPI,
    survey: surveyAPI,
    chat: chatAPI,
    experiment: experimentAPI
};