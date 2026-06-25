import { SurveyPage } from "@/src/types/interfaces";

export const preSurveyPages: SurveyPage[] = [
    {
        questions: [
            {
                type: "choice",
                name: "aiFrequency",
                question: "How often do you use AI tools such as ChatGPT, Gemini, Claude, or similar systems?",
                options: ["1 - Never", "2 - Less than once a month", "3 - A few times per month", "4 - A few times per week", "5 - Daily or almost daily"],
            },
            {
                type: "choice",
                name: "partyIdentification",
                question: "Generally speaking, do you think of yourself as a Republican, a Democrat, an Independent, or something else?",
                options: ["Republican", "Democrat", "Independent/Other"],
                randomized: true
            }
        ]
    },
    {
        questions: [
            {
                type: "choice",
                name: "strongRepublican",
                questionLabel: "Q2.1",
                question: "Would you call yourself a strong Republican or a not very strong Republican?",
                options: ["Not very strong Republican", "Strong Republican"],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Republican",
            },
            {
                type: "choice",
                name: "strongDemocrat",
                questionLabel: "Q2.1",
                question: "Would you call yourself a strong Democrat or a not very strong Democrat?",
                options: ["Not very strong Democrat", "Strong Democrat"],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Democrat",
            },
            {
                type: "scale",
                name: "closerParty",
                questionLabel: "Q2.1",
                question: "Do you think of yourself as closer to the Republican Party or the Democratic Party?",
                min: -50,
                max: 50,
                milestones: [{ value: -50, label: "Closer to Republican Party" }, { value: 0, label: "Neither" }, { value: 50, label: "Closer to Democratic Party" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Independent/Other",
            }
        ]
    },
    // Mediators (pre-measure)
    {
        questions: [
            {
                type: "scale",
                name: "similarityToOutgroup",
                question: "How similar are you to [Democrats/Republicans]?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not similar at all" }, { value: 50, label: "Moderately similar" }, { value: 100, label: "Extremely similar" }]
            },
            {
                type: "scale",
                name: "partyImportancePost",
                question: "How important is being a [Republican/Democrat] to you?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not important at all" }, { value: 50, label: "Moderately important" }, { value: 100, label: "Extremely important" }]
            },
            {
                type: "scale",
                name: "angerTowardOutgroup",
                question: "How much anger do you feel toward [Democrats/Republicans]?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "No anger at all" }, { value: 50, label: "A moderate amount of anger" }, { value: 100, label: "A great deal of anger" }]
            },
            {
                type: "scale",
                name: "empathyTowardOutgroup",
                question: "How much empathy do you feel toward [Democrats/Republicans]?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "No empathy at all" }, { value: 50, label: "A moderate amount of empathy" }, { value: 100, label: "A great deal of empathy" }]
            },
            {
                type: "scale",
                name: "commonEnemy",
                question: "To what extent should Democrats and Republicans see themselves as united against a common enemy?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not at all" }, { value: 50, label: "A moderate amount" }, { value: 100, label: "A great deal" }]
            },
            {
                type: "scale",
                name: "threatPerception",
                question: "To what extent do you view [Democrats/Republicans] as a serious threat to the country's well-being?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not at all" }, { value: 50, label: "A moderate amount" }, { value: 100, label: "A great deal" }]
            }
        ],
        randomized: true
    },
    {
        questions: [
            {
                type: "choice",
                name: "attentionCheckPre",
                question: `To help keep track of who is paying attention, please select "4 - Somewhat disagree" in the options below.`,
                options: ["1 - Strongly agree", "2 - Somewhat agree", "3 - No opinion", "4 - Somewhat disagree", "5 - Strongly disagree"]
            }
        ],
    },
];

export const postSurveyPages: SurveyPage[] = [
    // Page 1 – General affect & manipulation check
    {
        questions: [
            {
                type: "likert",
                name: "conversationEmotions",
                question: "After the conversation, how much do you feel each of the following emotions?",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Not at all" },
                    { value: 2, label: "A little" },
                    { value: 3, label: "Somewhat" },
                    { value: 4, label: "Moderately" },
                    { value: 5, label: "Quite a bit" },
                    { value: 6, label: "Very" },
                    { value: 7, label: "Very much" },
                ],
                statements: [
                    { name: "emotionEnthusiastic", content: "Enthusiastic" },
                    { name: "emotionHappy", content: "Happy" },
                    { name: "emotionCalm", content: "Calm" },
                    { name: "emotionDull", content: "Dull" },
                    { name: "emotionAngry", content: "Angry" },
                    { name: "emotionSad", content: "Sad" },
                ],
                randomized: true
            },
            {
                type: "choice",
                name: "completedTask",
                question: "During my conversation with the AI agent, the main task I completed was:",
                options: ["Reflecting on shared identities.", "Thinking about someone from the opposing party.", "Completing a quiz about the opposing party’s beliefs.", "None of above"],
                randomized: true
            },
        ]
    },

    // Page 2: Feeling Thermometer
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
        randomized: true,
        paragraph: "We would like to get your feelings toward both Democrats and Republicans using something we call the feeling thermometer.",
        bullets: [
            "**50–100 degrees**: You feel favorable and warm toward them.",
            "**0–50 degrees**: You don't feel favorable toward them and don't care too much for them.",
            "**50 degrees**: You don't feel particularly warm or cold toward them."
        ]
    },
    // Page 3: Money Allocation
    {
        questions: [
            {
                type: "scale",
                name: "giveCents",
                question: "How many cents (if any) would you give to the [Democrat/Republican] participant?",
                min: 0,
                max: 50,
                milestones: [{ value: 0, label: "cents" }, { value: 25, label: "cents" }, { value: 50, label: "cents" }],
                displayValue: ((value: number) =>
                    <div className="flex justify-around">
                        <span className="text-xl font-semibold text-blue-600">Their Share {value}</span>
                        <span className="text-xl font-semibold text-zinc-400">{50 - value} Your Share</span>
                    </div>
                )
            },
        ],
        paragraph: "Suppose you have been anonymously and randomly matched with another participant who identifies as a [Democrat/Republican]. You have been given 50 cents. How would you decide to split these 50 cents between yourself and the [Democrat/Republican] participant?"
    },
    // Page 4: Democratic Norms (outgroup)
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
                question: "[Republican/Democrat] governors should ignore unfavorable court rulings by [Democratic/Republican]-appointed judges.",
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
            },
            {
                type: "scale",
                name: "attentionCheckPost",
                question: "To help keep track of who is paying attention, please move this slider to \"Strongly agree\" for this statement.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            }
        ],
        randomized: true,
        paragraph: "Please indicate how much you disagree or agree with each of the following statements.",
    },
    // Page 5: Political Violence (outgroup)
    {
        questions: [
            {
                type: "scale",
                name: "sendThreateningMessages",
                question: "When, if ever, is it OK for [Republicans/Democrats] to send threatening and intimidating messages to [Democrat/Republican] party leaders?",
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
                question: "How much do you feel it is justified for [Republicans/Democrats] to use violence if the [Democrat/Republican] party wins more races in the next election?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            }
        ],
        randomized: true,
        paragraph: "Please answer the following questions."
    },
    // // Page 5: Manipulation Check
    // {
    //     questions: [
    //         {
    //             type: "rating",
    //             name: "mcMedia",
    //             question: "The agent asked me to reflect on how media shapes my view of the opposing party.",
    //             min: 1,
    //             max: 5,
    //             minLabel: "Strongly disagree",
    //             maxLabel: "Strongly agree"
    //         },
    //         {
    //             type: "rating",
    //             name: "mcPerson",
    //             question: "The agent asked me to think about a specific person I know from the opposing party.",
    //             min: 1,
    //             max: 5,
    //             minLabel: "Strongly disagree",
    //             maxLabel: "Strongly agree"
    //         },
    //         {
    //             type: "rating",
    //             name: "mcSurveyData",
    //             question: "The agent showed me survey data about what the opposing party actually believes.",
    //             min: 1,
    //             max: 5,
    //             minLabel: "Strongly disagree",
    //             maxLabel: "Strongly agree"
    //         },
    //         {
    //             type: "rating",
    //             name: "mcWellbeing",
    //             question: "The agent focused on my personal well-being rather than politics.",
    //             min: 1,
    //             max: 5,
    //             minLabel: "Strongly disagree",
    //             maxLabel: "Strongly agree"
    //         },
    //         {
    //             type: "rating",
    //             name: "mcFreeConversation",
    //             question: "The agent let me talk about politics freely without guiding the conversation in a specific direction.",
    //             min: 1,
    //             max: 5,
    //             minLabel: "Strongly disagree",
    //             maxLabel: "Strongly agree"
    //         },
    //     ],
    //     paragraph: "During my conversation with the AI agent..."
    // },
    // Page 6: Conversation Experience
    {
        questions: [
            {
                type: "likert",
                name: "conversationExperience",
                question:"Please indicate how much you agree with each of the following statements about your conversation with the AI agent.",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Strongly disagree" },
                    { value: 2, label: "Somewhat disagree" },
                    { value: 3, label: "Disagree" },
                    { value: 4, label: "Neither agree nor disagree" },
                    { value: 5, label: "Agree" },
                    { value: 6, label: "Somewhat agree" },
                    { value: 7, label: "Strongly agree" },
                ],
                statements: [
                    { name: "ceEasyToUnderstand", content: "The agent's responses were easy to understand." },
                    { name: "ceClearCommunication", content: "Communicating with the agent was clear." },
                    { name: "ceKeptContext", content: "The agent was able to keep track of context." },
                    { name: "attentionCheckConversation", content: `To show that you are paying attention, please select "2-Somewhat disagree" for this question.` },
                ],
                randomized: true
            },
            {
                type: "semanticDifferential",
                name: "agentImpression",
                question: "Please rate your impression of the AI agent during the conversation.",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Strongly agree" },
                    { value: 2, label: "Agree" },
                    { value: 3, label: "Somewhat agree" },
                    { value: 4, label: "Not at all" },
                    { value: 5, label: "Somewhat agree" },
                    { value: 6, label: "Agree" },
                    { value: 7, label: "Strongly agree" },
                ],
                statements: [
                    { name: "impressionFakeNatural", leftLabel: "Fake", rightLabel: "Natural" },
                    { name: "impressionMachinelikeHumanlike", leftLabel: "Machinelike", rightLabel: "Humanlike" },
                    { name: "impressionUnconsciousConscious", leftLabel: "Unconscious", rightLabel: "Conscious" },
                ],
                randomized: true
            },
            {
                type: "likert",
                name: "feltHeard",
                question: "During this conversation, how much do you agree with each of the following statements about the AI agent?",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Strongly disagree" },
                    { value: 2, label: "Somewhat disagree" },
                    { value: 3, label: "Disagree" },
                    { value: 4, label: "Neither agree nor disagree" },
                    { value: 5, label: "Agree" },
                    { value: 6, label: "Somewhat agree" },
                    { value: 7, label: "Strongly agree" },
                ],
                statements: [
                    { name: "fhListened", content: "The AI agent really listened to me." },
                    { name: "fhInterested", content: "The AI agent seemed interested in what I was thinking and feeling." },
                    { name: "fhUnderstoodPerspective", content: "The AI agent tried to understand where I was coming from." },
                    { name: "fhUnderstanding", content: "The AI agent was understanding." },
                    { name: "fhResponsive", content: "The AI agent was responsive to me." },
                ],
                randomized: true
            },
        ]
    },
    // Page 7: Perceived Manipulation + Willingness to Engage + Open-ended
    {
        questions: [
            {
                type: "likert",
                name: "trustInAgent",
                question: "Please indicate how much you agree with each of the following statements about the AI agent.",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Strongly disagree" },
                    { value: 2, label: "Somewhat disagree" },
                    { value: 3, label: "Disagree" },
                    { value: 4, label: "Neither agree nor disagree" },
                    { value: 5, label: "Agree" },
                    { value: 6, label: "Somewhat agree" },
                    { value: 7, label: "Strongly agree" },
                ],
                statements: [
                    { name: "taSuspicious", content: "I am suspicious of the AI agent's intent, action, or output." },
                    { name: "taWary", content: "I am wary of the AI agent." },
                    { name: "taConfident", content: "I am confident in the AI agent." },
                    { name: "taIntegrity", content: "The agent has integrity." },
                    { name: "taDependable", content: "The agent is dependable." },
                    { name: "taReliable", content: "The agent is reliable." },
                    { name: "taTrust", content: "I can trust the agent." },
                ],
                randomized: true
            },
            {
                type: "likert",
                name: "manipulationAndEngagement",
                question: "Please indicate how much you agree with each of the following statements.",
                min: 1,
                max: 7,
                milestones: [
                    { value: 1, label: "Strongly disagree" },
                    { value: 2, label: "Somewhat disagree" },
                    { value: 3, label: "Disagree" },
                    { value: 4, label: "Neither agree nor disagree" },
                    { value: 5, label: "Agree" },
                    { value: 6, label: "Somewhat agree" },
                    { value: 7, label: "Strongly agree" },
                ],
                statements: [
                    { name: "pmChangingViews", content: "The agent was trying to change my political views." },
                    { name: "pmHiddenAgenda", content: "I felt like the agent had a hidden agenda." },
                    { name: "pmHonestIntentions", content: "The agent was honest about its intentions." },
                    { name: "weWillingToDiscuss", content: "After this conversation, I would be more willing to discuss politics with someone from the opposing party." },
                    { name: "weMoreOpen", content: "I feel more open to hearing the opposing party's perspective than before." },
                    { name: "weMoreConversations", content: "I would be interested in having more conversations like this one." },
                ],
                randomized: true
            },
        ],
        paragraph: "The following questions ask about your perceptions of the AI agent and your experience during the conversation."
    },
    // Page 8: Open-ended
    {
        questions: [
            {
                type: "rating",
                name: "weWillingFuture",
                question: "I would be willing to discuss similar topics with an AI agent like this in the future.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "text",
                name: "weWillingFutureWhy",
                question: "Please briefly explain why you would or would not be willing to discuss similar topics with an AI agent like this in the future.",
            },
            {
                type: "rating",
                name: "saSatisfiedOverall",
                question: "Overall, I was satisfied with my conversation experience with the AI agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "text",
                name: "saSatisfiedWhy",
                question: "Please briefly explain what made you satisfied or dissatisfied with your conversation experience with the AI agent.",
            },
            {
                type: "text",
                name: "oqAttitudeChange",
                question: "Did the conversation change how you think about the opposing party in any way? If so, how?",
            },
            {
                type: "text",
                name: "oqImprove",
                question: "Is there anything else you would like to share about how we could improve the AI agent?",
            },
        ],
    },
];
