import { ConsentFormItem } from "../types/interfaces";


export const consentFormItems: ConsentFormItem[] = [
    {
        title: "Identification of Investigator and Purpose of Study",
        content: (
            <>
                <p>
                    You are invited to participate in a research study about how people use AI assistants to engage with public issues.
                    Please read the information below before deciding whether to take part.
                    This study is conducted by Professor Chenyan Jia and Ph.D. student Min Ge at Northeastern University.
                    If you have questions about the study, you may contact the research team at{" "}
                    <a
                        href="mailto:chenyanjia@northeastern.edu"
                        className="text-blue-600 underline"
                    >
                        chenyanjia@northeastern.edu
                    </a>
                    {" or "}
                    <a
                        href="mailto:ge.min@northeastern.edu"
                        className="text-blue-600 underline"
                    >
                        ge.min@northeastern.edu
                    </a>.
                </p>
                <br />
                <p>You must be at least 18 years old to participate. Participation will involve:</p>
                <ul>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>First item with custom spacing</span>
                    </li>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>Completing a brief pre-survey.</span>
                    </li>
                    <li className="flex gap-5">
                        <span>•</span>
                        <span>Follow-up questionnaires after interaction.</span>
                    </li>
                </ul>
                <p>
                    The study will take approximately <strong>15-20 minutes</strong> to complete.
                    You will receive approximately <strong>$3</strong> in total compensation.
                    Payment will be provided via Prolific upon study completion.
                </p>
            </>
        ),
    },
    {
        title: "Risks/Benefits/Confidentiality of Data",
        content: "There are no risks to participating in this study beyond those encountered in everyday online experiences. There will be no costs to you for participating, and there are no direct benefits. No directly identifiable information about you (such as your name or email address) will be collected, so your responses cannot be linked back to you. Only authorized members of the research team will have access to the data during data collection. Prolific IDs will not be shared outside the research team, will be removed from the dataset, and will not be linked to survey responses."
    },
    {
        title: "Participation or Withdrawal",
        content: "Your participation in this study is voluntary. You may decline to answer any question, and you may withdraw from participation at any time without penalty. Withdrawal will not affect your relationship with Northeastern University in any way. If you choose not to participate or wish to stop at any time, you may simply exit the study or close your browser window.",
    },
    {
        title: "Questions about your rights as a research participant",
        content: (
            <>
                <p>
                    If you have questions about your rights or are dissatisfied at any time with any part of this study, you can contact, anonymously if you wish,
                    the Institutional Review Board by phone at (773)-396-2327 or email at{" "}
                    <a
                        href="mailto:IRBreview@northeastern.edu"
                        className="text-blue-600 underline"
                    >
                        IRBreview@northeastern.edu
                    </a>.
                </p>
                <br />
                <p>
                    By clicking <strong>[CONTINUE]</strong> I affirm that I am at least 18 years old and I consent to participate in this study.
                    By taking this survey, I indicate my consent to participate in this study.
                </p>
            </>
        ),
    },
];