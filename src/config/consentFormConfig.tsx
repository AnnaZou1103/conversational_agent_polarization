import { ConsentFormItem } from "../types/interfaces";


export const consentFormItems: ConsentFormItem[] = [
    {
        title: "About This Study",
        content: (
            <>
                <p>
                    You are invited to participate in a research study about how people interact with AI conversational agents on topics related to political attitudes.
                    This study is conducted by Professor Chenyan Jia and Ph.D. student Min Ge at Northeastern University.
                    Contact us at{" "}
                    <a href="mailto:chenyanjia@northeastern.edu" className="text-blue-600 underline">
                        chenyanjia@northeastern.edu
                    </a>
                    {" or "}
                    <a href="mailto:ge.min@northeastern.edu" className="text-blue-600 underline">
                        ge.min@northeastern.edu
                    </a>.
                </p>
                <br />
                <p>You must be at least 18 years old to participate.</p>
            </>
        ),
    },
    {
        title: "What You Will Do",
        content: (
            <>
                <p>Participation will involve:</p>
                <br />
                <ul className="space-y-2">
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>Completing a brief pre-survey about your background and political views.</span>
                    </li>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>Having a text-based conversation with an AI conversational agent. The agent will engage you in a discussion related to your perceptions of people from the opposing political party.</span>
                    </li>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>Completing follow-up questionnaires about your experience and attitudes.</span>
                    </li>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>A hypothetical money-allocation task (no actual money will be exchanged; your response will not affect your compensation).</span>
                    </li>
                </ul>
                <br />
                <p>The study will take approximately <strong>15–20 minutes</strong> to complete. You will receive <strong>$3</strong> via CloudResearch upon completion (~$9/hour).</p>
            </>
        ),
    },
    {
        title: "Risks",
        content: "Risks are minimal. You may experience mild emotional discomfort when discussing topics related to political attitudes, and occasional frustration when interacting with the AI. The AI may generate inaccurate or incomplete content. You may skip any question or stop at any time without penalty.",
    },
    {
        title: "Privacy & Confidentiality",
        content: "No directly identifiable information will be collected. If recruited via CloudResearch, your platform ID will be used for payment only and removed from the dataset afterward. Research data is stored securely and accessible only to the research team. Anonymized data may be used in future research without additional consent.",
    },
    {
        title: "Participation & Withdrawal",
        content: "Participation is voluntary. You may withdraw at any time without penalty or loss of benefits. If you withdraw before submitting, your data will not be recorded. Note: text you enter during conversations with the AI agent cannot be withdrawn from the AI system once submitted, but it will not be linked to your identity.",
    },
    {
        title: "Contact",
        content: (
            <>
                <p>
                    Questions about the study:{" "}
                    <a href="mailto:chenyanjia@northeastern.edu" className="text-blue-600 underline">chenyanjia@northeastern.edu</a>
                    {" or "}
                    <a href="mailto:ge.min@northeastern.edu" className="text-blue-600 underline">ge.min@northeastern.edu</a>
                </p>
                <br />
                <p>
                    Questions about your rights: Northeastern University IRB at (773)-396-2327 or{" "}
                    <a href="mailto:IRBreview@northeastern.edu" className="text-blue-600 underline">IRBreview@northeastern.edu</a>
                    {" "}(anonymous calls accepted).
                </p>
                <br />
                <p>
                    By clicking <strong>[CONTINUE]</strong> I affirm that I am at least 18 years old and I consent to participate in this study.
                </p>
            </>
        ),
    },
];
