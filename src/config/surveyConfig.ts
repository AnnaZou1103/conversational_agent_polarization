import { Party, SurveyPage } from "@/src/types/interfaces";

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
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Republican" }, { value: 50, label: "Moderately strong Republican" }, { value: 100, label: "Strong Republican" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Republican",
            },
            {
                type: "scale",
                name: "strongDemocrat",
                question: "Q2.1. Would you call yourself a strong Democrat or a not very strong Democrat?",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Democrat" }, { value: 50, label: "Moderately strong Democrat" }, { value: 100, label: "Strong Democrat" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Democrat",
            },
            {
                type: "scale",
                name: "closerParty",
                question: "Q2.1. Do you think of yourself as closer to the Republican Party or the Democratic Party?",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Closer to Republican Party" }, { value: 50, label: "Neither" }, { value: 100, label: "Closer to Democratic Party" }],
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
                isDiscrete: false,
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
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Very cold\nor unfavorable feeling" }, { value: 50, label: "No feeling at all" }, { value: 100, label: "Very warm\nor favorable feeling" }]
            },
            {
                type: "scale",
                name: "rateDemocrats",
                question: "How would you rate Democrats?",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Very cold\nor unfavorable feeling" }, { value: 50, label: "No feeling at all" }, { value: 100, label: "Very warm\nor favorable feeling" }]
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
                isDiscrete: false,
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
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "ignoreUnfavorableJudges",
                question: "[Republican/Democratic] governors should ignore unfavorable court rulings by [Democrat/Republican]-appointed judges.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "prosecuteJournalists",
                question: "[Republican/Democratic] governors should prosecute journalists who accuse [Republican/Democratic] politicians of misconduct without revealing sources.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "acceptElectionResults",
                question: "[Republicans/Democrats] should not accept the results of elections if they lose.",
                isDiscrete: false,
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
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "publicHarass",
                question: "When, if ever, is it OK for an ordinary [Republican/Democrat] in the public to harass an ordinary [Democrat/Republican] on the Internet, in a way that makes the target feel frightened?",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "violanceForGoals",
                question: "How much do you feel it is justified for [Republicans/Democrats] to use violence in advancing their political goals these days?",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            },
            {
                type: "scale",
                name: "violanceForElection",
                question: "How much do you feel it is justified for [Republicans/Democrats] to use violence if the [Democratic/Republican] party wins more races in the next election?",
                isDiscrete: false,
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
                type: "likert",
                name: "agentTrust",
                min: 1,
                max: 7,
                statements: [
                    { name: "negativeConsequences", content: "I believe that there could be negative consequences when using this agent." },
                    { name: "cautiousUsingAgent", content: "I feel I must be cautious when using this agent." },
                    { name: "riskyToInteract", content: "It is risky to interact with this agent." },
                    { name: "actsInBestInterest", content: "I believe that this agent will act in my best interest." },
                    { name: "triesToHelp", content: "I believe that this agent will do its best to help me if I need help." },
                    { name: "understandsNeeds", content: "I believe that this agent is interested in understanding my needs and preferences." },
                    { name: "competentAndEffective", content: "I think that this agent is competent and effective in its role." },
                    { name: "performsRoleWell", content: "I think that this agent performs its role very well." },
                    { name: "hasExpectedFunctionalities", content: "I believe that this agent has all the functionalities I would expect." },
                    { name: "dependCompletely", content: "If I use this agent, I think I would be able to depend on it completely." },
                    { name: "alwaysReliable", content: "I can always rely on this agent for assistance." },
                    { name: "trustInformation", content: "I can trust the information presented to me by this agent." }
                ]
            }
        ],
        paragraph: "Q10. Please indicate how much you disagree or agree with each of the following statements."
    },
    {
        questions: [
            {
                type: "scale",
                name: "Di",
                question: "During Donald Trump's presidency, there was the lowest rate of Black people and Hispanics in poverty since these data began being collected in 1966.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            },
            {
                type: "scale",
                name: "Dii",
                question: "The Trump administration deported fewer undocumented immigrants in its first three years than the Obama administration did in its first three years.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            }
        ],
        paragraph: "In this task, we will ask you to give us your opinion about various claims. The claims are statements that may be true or may be false. The truth or falsity of the statements has been determined by real-world sources.\n\nWhat is the likelihood that the following statements are true?\nPlease choose a point that best describes your view on the below scale that goes from 0% (certainly false) to 100% (certainly true)."
    },
    {
        questions: [
            {
                type: "scale",
                name: "Diii",
                question: "During Donald Trump's presidency, the unemployment rate reached its lowest level since 1969.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            },
            {
                type: "scale",
                name: "Div",
                question: "Donald Trump was lawfully elected President in the 2016 election against Hillary Clinton.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            }
        ],
    },
    {
        questions: [
            {
                type: "scale",
                name: "Ri",
                question: "The vast majority (more than 90%) of climate scientists believe that climate change is an established fact and that it is most likely caused by human-made emissions.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            },
            {
                type: "scale",
                name: "Rii",
                question: "The crime rate among illegal immigrants is lower than the crime rate among American citizens.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            }
        ],
    },
    {
        questions: [
            {
                type: "scale",
                name: "Riii",
                question: "White Americans own homes at a higher rate than Black Americans, and this gap is larger now than it was in the late 1960s.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            },
            {
                type: "scale",
                name: "Riv",
                question: "Joe Biden was lawfully elected President in the 2020 election against Donald Trump.",
                isDiscrete: false,
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "0% certainly false" }, { value: 100, label: "100% certainly true" }]
            }
        ],
    },
];