import { SurveyPage } from "@/src/types/interfaces";

export const preSurveyPages: SurveyPage[] = [
    {
        questions: [
            {
                type: "choice",
                name: "aiFrequency",
                question: "Q1. How often do you use AI tools such as ChatGPT, Gemini, or similar systems?",
                options: ["Never", "Less than once a month", "A few times per month", "A few times per week", "Daily or almost daily"],
            },
            {
                type: "choice",
                name: "partyIdentification",
                question: "Q2. Generally speaking, do you think of yourself as a Republican, a Democrat, an Independent, or something else?",
                options: ["Republican", "Democrat", "Independent/Other"],
                randomized: true
            }]
    },
    {
        questions: [
            {
                type: "scale",
                name: "strongRepublican",
                question: "Q2.1. Would you call yourself a strong Republican or a not very strong Republican?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Republican" }, { value: 50, label: "Moderately strong Republican" }, { value: 100, label: "Strong Republican" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Republican",
            },
            {
                type: "scale",
                name: "strongDemocrat",
                question: "Q2.1. Would you call yourself a strong Democrat or a not very strong Democrat?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Democrat" }, { value: 50, label: "Moderately strong Democrat" }, { value: 100, label: "Strong Democrat" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Democrat",
            },
            {
                type: "scale",
                name: "closerParty",
                question: "Q2.1. Do you think of yourself as closer to the Republican Party or the Democratic Party?",
                min: -50,
                max: 50,
                milestones: [{ value: -50, label: "Closer to Republican Party" }, { value: 0, label: "Neither" }, { value: 50, label: "Closer to Democratic Party" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Independent/Other",
            }
        ]
    },
    {
        questions: [
            {
                type: "scale",
                name: "partisanshipStrength",
                question: "Q3. How important is being a [Republican/Democrat] to you?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not important at all" }, { value: 50, label: "Moderately important" }, { value: 100, label: "Extremely important" }]
            },
            {
                type: "rating",
                name: "issueAttitude",
                question: "Q4. What is your overall attitude toward [issue]?",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            }
        ],
    },
    {
        questions: [
            {
                type: "choice",
                name: "attentionCheck",
                question: `Q5. To help keep track of who is paying attention, please select "Somewhat disagree" in the options below.`,
                options: ["Strongly agree", "Somewhat agree", "No opinion", "Somewhat disagree", "Strongly disagree"]
            }
        ],
    },
];

export const postSurveyPages: SurveyPage[] = [
    {
        questions: [
            {
                type: "scale",
                name: "rateRepublicans",
                question: "How would you rate Republicans?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Very cold\nor unfavorable feeling" }, { value: 50, label: "Neutral" }, { value: 100, label: "Very warm\nor favorable feeling" }]
            },
            {
                type: "scale",
                name: "rateDemocrats",
                question: "How would you rate Democrats?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Very cold\nor unfavorable feeling" }, { value: 50, label: "Neutral" }, { value: 100, label: "Very warm\nor favorable feeling" }]
            }
        ],
        paragraph: "Q6. We would like to get your feelings toward both Democrats and Republicans. We would like you to rate them using something we call the feeling thermometer.\n\nRatings between 50 degrees and 100 degrees mean that you feel favorable and warm toward them. Ratings between 0 degrees and 50 degrees mean that you don't feel favorable toward them and that you don't care too much for them. You would rate them at the 50 degree mark if you don't feel particularly warm or cold toward them."
    },
    {
        questions: [
            {
                type: "scale",
                name: "giveCents",
                question: "How many cents (if any) will you give to the [Democratic/Republican] participant?",
                min: 0,
                max: 50,
                milestones: [{ value: 0, label: "0 cents" }, { value: 25, label: "25 cents" }, { value: 50, label: "50 cents" }]
            },
        ],
        paragraph: "Q7. You have been anonymously and randomly matched with another participant who identifies as a [Democrat/Republican].\nYou have been given 50 cents. You will now decide how to split these 50 cents between yourself and the [Democratic/Republican] participant. You can give any amount between 0 cents and 50 cents to the other participant. The other participant cannot affect the outcome you choose."
    },
    {
        questions: [
            {
                type: "scale",
                name: "reducePollStations",
                question: "[Republicans/Democrats] should reduce the number of polling stations in areas that support [Democrats/Republicans].",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "ignoreUnfavorableJudges",
                question: "[Republican/Democratic] governors should ignore unfavorable court rulings by [Democrat/Republican]-appointed judges.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "prosecuteJournalists",
                question: "[Republican/Democratic] governors should prosecute journalists who accuse [Republican/Democratic] politicians of misconduct without revealing sources.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "acceptElectionResults",
                question: "[Republicans/Democrats] should not accept the results of elections if they lose.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            }
        ],
        paragraph: "Q8. Please indicate how much you disagree or agree with each of the following statements."
    },
    {
        questions: [
            {
                type: "scale",
                name: "sendThreateningMessages",
                question: "When, if ever, is it OK for [Republicans/Democrats] to send threatening and intimidating messages to [Democratic/Republican] party leaders?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "publicHarass",
                question: "When, if ever, is it OK for an ordinary [Republican/Democrat] in the public to harass an ordinary [Democrat/Republican] on the Internet, in a way that makes the target feel frightened?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "violanceForGoals",
                question: "How much do you feel it is justified for [Republicans/Democrats] to use violence in advancing their political goals these days?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            },
            {
                type: "scale",
                name: "violanceForElection",
                question: "How much do you feel it is justified for [Republicans/Democrats] to use violence if the [Democratic/Republican] party wins more races in the next election?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            }
        ],
        paragraph: "Q9. Please answer the following questions."
    },
    {
        questions: [
            {
                type: "rating",
                name: "negativeConsequences",
                question: "I believe that there could be negative consequences when using this agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "cautiousUsingAgent",
                question: "I feel I must be cautious when using this agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "riskyToInteract",
                question: "It is risky to interact with this agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "actsInBestInterest",
                question: "I believe that this agent will act in my best interest.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "triesToHelp",
                question: "I believe that this agent will do its best to help me if I need help.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "understandsNeeds",
                question: "I believe that this agent is interested in understanding my needs and preferences.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "competentAndEffective",
                question: "I think that this agent is competent and effective in its role.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "performsRoleWell",
                question: "I think that this agent performs its role very well.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "hasExpectedFunctionalities",
                question: "I believe that this agent has all the functionalities I would expect.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            }, {
                type: "rating",
                name: "dependCompletely",
                question: "If I use this agent, I think I would be able to depend on it completely.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "alwaysReliable",
                question: "I can always rely on this agent for assistance.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
            {
                type: "rating",
                name: "trustInformation",
                question: "I can trust the information presented to me by this agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly oppose",
                maxLabel: "Strongly support"
            },
        ],
        paragraph: "Q10. Please indicate how much you disagree or agree with each of the following statements.",
        randomized: true
    },
];