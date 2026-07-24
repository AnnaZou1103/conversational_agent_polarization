export const transitionMessages = {
    toIntervention: (
        <div className="w-full space-y-4">
            <p className="text-title">Congratulations!</p>
            <p className="text-main-body">You have finished the first part.</p>

            <p className="text-main-body"><strong>⚠️ IMPORTANT:</strong> Please do not close or refresh this tab.</p>

            <hr className="border-zinc-200 my-2" />

            <p className="text-subtitle">📌 TASK INSTRUCTIONS</p>

            <p className="text-main-body"><strong>🎯 YOUR TASK</strong><br />You will have a conversation with an AI conversational agent about your thoughts, feelings and perceptions.</p>
            <p className="text-main-body"><strong>⏱️ ESTIMATED TIME</strong><br />The conversation will take approximately 8-10 minutes.</p>
            <p className="text-main-body"><strong>✅ WHEN TO CONTINUE</strong><br />A "Continue" button will appear when the conversation is complete. Please continue only after the conversation is finished.</p>
            <p className="text-main-body"><strong>⏳ LOADING NOTE</strong><br />Responses from the AI agent may take a little time to load. Please be patient while it responds.</p>
            <p className="text-main-body"><strong>⚠️ IMPORTANT REMINDER</strong><br />Do not close or refresh this tab during the conversation.</p>
        </div>
    ),
    toPostSurvey: (
        <div className="w-full space-y-4">
            <p className="text-title">Almost done!</p>
            <p className="text-main-body">You are now moving on to the last section of the study.</p>
            <p className="text-main-body">Please answer the following questions to the best of your ability.</p>
            <p className="text-main-body">Thank you.</p>
        </div>
    )
};

export const thankyouMessage = (
    <div className="space-y-3">
        <h1 className="text-title">Congratulations!</h1>
        <p className="text-main-body">You have finished all parts of the study.</p>
        <p className="text-main-body">Please click the button below to return to CloudResearch.</p>
        <p className="text-main-body">Thank you for your participation.</p>
    </div>
);

export const screenedOutMessage = (
    <div className="space-y-3">
        <h1 className="text-title">Thank you for your response.</h1>
        <p className="text-main-body">
            Based on your response, we have already reached our target number of participants for this group, so you do not need to complete the remaining portions of the study.
        </p>
        <p className="text-main-body">Please click the button below to return to CloudResearch.</p>
        <p className="text-main-body">Thank you for your participation.</p>
    </div>
);

export const cloudResearchRedirectUrls = {
    completed: "https://connect.cloudresearch.com/participant/project/982C965085/complete",
    screenedOut: "https://connect.cloudresearch.com/participant/project/9FDFEC3E7E/complete",
};
