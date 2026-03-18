export const transitionMessages = {
    toIntervention: (
        <div className="w-full">
            <p className="text-main-body">Congradulations, you have finished the first part!</p>
            <br />
            <p className="text-main-body">As you proceed to the next section, please make sure you do not close out of this tab. You must complete the whole study to collect your payment.</p>
            <br />
            <br />
            <h1 className="text-xl font-bold">Task Instruction</h1>
            <br />
            <p className="text-main-body">In the following section, you will be asked to write a <strong>persuasive message</strong> to individuals from the opposing political party on [Gun control/Immigration]. (Participants will be randomly assigned to one of the conditions.)</p>
            <br />
            <p className="text-main-body">Before submitting your message, you will have the opportunity to interact with a conversational AI agent that can help you refine your statement. You are welcome to share your initial thoughts, concerns, or reasoning with the agent.</p>
            <br />
            <p className="text-main-body">After the interaction, please submit your final revised message. There are no right or wrong answers. We are interested in your honest views.</p>
        </div>
    ),
    toPostSurvey: (
        <div className="w-full">
            <p className="text-main-body">You are now moving on to the last section of the study.</p>
            <br />
            <p>Please answer the following questions to the best of your ability.</p>
            <br />
            <p>Thank you.</p>
        </div>
    )
};

export const thankyouMessage = (
    <>
        <h1 className="text-title">Congratulations!</h1>
        <p>You have finished all parts!</p>
        <p>Now you can close the tab.</p>
        <p>Thank you for participating this study.</p>
    </>
);