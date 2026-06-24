export const transitionMessages = {
    toIntervention: (
        <div className="w-full space-y-4">
            <p className="text-title">Congratulations!</p>
            <p className="text-main-body">You have finished the first part. Please make sure you do not close this tab.</p>

            <hr className="border-zinc-200 my-2" />

            <p className="text-subtitle">Task Instruction</p>
            <p className="text-main-body"><strong>Your task:</strong> Have a conversation with an AI conversational agent about your perceptions of people from the opposing political party.</p>
            <p className="text-main-body"><strong>Estimated time:</strong> The conversation will take approximately <strong>5–8 minutes</strong>.</p>
            <p className="text-main-body"><strong>When to continue:</strong> A <strong>"Continue"</strong> button will appear when the conversation is complete.</p>
            <p className="text-main-body"><strong>Loading note:</strong> Responses from the AI agent may take a little time to load. Please be patient while it responds.</p>
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
        <p className="text-main-body">Please click the button below to return to Prolific.</p>
        <p className="text-main-body">Thank you for your participation.</p>
    </div>
);

export const screenedOutMessage = (
    <div className="space-y-3">
        <h1 className="text-title">Thank you for your response.</h1>
        <p className="text-main-body">
            Based on your response, we have already reached our target number of participants for this group, so you do not need to complete the remaining portions of the study.
        </p>
        <p className="text-main-body">Please click the button below to return to Prolific.</p>
        <p className="text-main-body">Thank you for your participation.</p>
    </div>
);

export const prolificRedirectUrls = {
    completed: "https://app.prolific.com/submissions/complete?cc=C19KD0EV",
    screenedOut: "https://app.prolific.com/submissions/complete?cc=C2ZEP3YP",
};
