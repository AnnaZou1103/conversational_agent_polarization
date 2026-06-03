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
                type: "scale",
                name: "strongRepublican",
                questionLabel: "Q2.1",
                question: "Would you call yourself a strong Republican or a not very strong Republican?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Republican" }, { value: 50, label: "Moderately strong Republican" }, { value: 100, label: "Strong Republican" }],
                showIf: (response: Record<string, string>) => response["partyIdentification"] === "Republican",
            },
            {
                type: "scale",
                name: "strongDemocrat",
                questionLabel: "Q2.1",
                question: "Would you call yourself a strong Democrat or a not very strong Democrat?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not very strong Democrat" }, { value: 50, label: "Moderately strong Democrat" }, { value: 100, label: "Strong Democrat" }],
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
                name: "attentionCheck",
                question: `To help keep track of who is paying attention, please select "Somewhat disagree" in the options below.`,
                options: ["Strongly agree", "Somewhat agree", "No opinion", "Somewhat disagree", "Strongly disagree"]
            }
        ],
    },
];

export const postSurveyPages: SurveyPage[] = [
    // Page 1: Feeling Thermometer
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
    // Page 2: Money Allocation
    {
        questions: [
            {
                type: "scale",
                name: "giveCents",
                question: "How many cents (if any) would you give to the [Democrat/Republican] participant?",
                min: 0,
                max: 50,
                milestones: [{ value: 0, label: "0 cents" }, { value: 25, label: "25 cents" }, { value: 50, label: "50 cents" }],
                displayValue: ((value: number) =>
                    <div className="flex justify-around">
                        <span className="text-xl font-semibold text-blue-600">Their Share {value}</span>
                        <span className="text-xl font-semibold text-zinc-400">{50 - value} Your Share</span>
                    </div>
                )
            },
        ],
        paragraph: "Q7. Suppose you have been anonymously and randomly matched with another participant who identifies as a [Democrat/Republican]. You have been given 50 cents. How would you decide to split these 50 cents between yourself and the [Democrat/Republican] participant?"
    },
    // Page 3: Democratic Norms (outgroup)
    {
        questions: [
            {
                type: "scale",
                name: "reducePollStations",
                question: "[Democrats/Republicans] should reduce the number of polling stations in areas that support [Republicans/Democrats].",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "ignoreUnfavorableJudges",
                question: "[Democratic/Republican] governors should ignore unfavorable court rulings by [Republican/Democrat]-appointed judges.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "prosecuteJournalists",
                question: "[Democratic/Republican] governors should prosecute journalists who accuse [Democratic/Republican] politicians of misconduct without revealing sources.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            },
            {
                type: "scale",
                name: "acceptElectionResults",
                question: "[Democrats/Republicans] should not accept the results of elections if they lose.",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Strongly disagree" }, { value: 50, label: "Neither disagree nor agree" }, { value: 100, label: "Strongly agree" }]
            }
        ],
        paragraph: "Q8. Please indicate how much you disagree or agree with each of the following statements."
    },
    // Page 4: Political Violence (outgroup)
    {
        questions: [
            {
                type: "scale",
                name: "sendThreateningMessages",
                question: "When, if ever, is it OK for [Democrats/Republicans] to send threatening and intimidating messages to [Republican/Democrat] party leaders?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "publicHarass",
                question: "When, if ever, is it OK for an ordinary [Democrat/Republican] in the public to harass an ordinary [Republican/Democrat] on the Internet, in a way that makes the target feel frightened?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Never" }, { value: 100, label: "Always" }]
            },
            {
                type: "scale",
                name: "violanceForGoals",
                question: "How much do you feel it is justified for [Democrats/Republicans] to use violence in advancing their political goals these days?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            },
            {
                type: "scale",
                name: "violanceForElection",
                question: "How much do you feel it is justified for [Democrats/Republicans] to use violence if the [Republican/Democrat] party wins more races in the next election?",
                min: 0,
                max: 100,
                milestones: [{ value: 0, label: "Not justified at all" }, { value: 50, label: "Moderately justified" }, { value: 100, label: "Extremely justified" }]
            }
        ],
        paragraph: "Q9. Please answer the following questions."
    },
    // Page 5: Manipulation Check
    {
        questions: [
            {
                type: "rating",
                name: "mcMedia",
                question: "The agent asked me to reflect on how media shapes my view of the opposing party.",
                min: 1,
                max: 5,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "mcPerson",
                question: "The agent asked me to think about a specific person I know from the opposing party.",
                min: 1,
                max: 5,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "mcSurveyData",
                question: "The agent showed me survey data about what the opposing party actually believes.",
                min: 1,
                max: 5,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "mcWellbeing",
                question: "The agent focused on my personal well-being rather than politics.",
                min: 1,
                max: 5,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "mcFreeConversation",
                question: "The agent let me talk about politics freely without guiding the conversation in a specific direction.",
                min: 1,
                max: 5,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
        ],
        paragraph: "During my conversation with the AI agent..."
    },
    // Page 7: Conversation Experience
    {
        questions: [
            {
                type: "rating",
                name: "cqListened",
                question: "The agent listened to what I said.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "cqInterested",
                question: "The agent seemed interested in my opinions and feelings.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "cqGoodConversation",
                question: "I felt I had a good conversation with the agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "enEnjoyed",
                question: "I enjoyed the conversation with the agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "enFocused",
                question: "I was able to stay focused during the conversation.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "enWillingAgain",
                question: "I would be willing to have another conversation with this agent.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "phHumanlike",
                question: "The agent felt humanlike rather than machinelike.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "phWarm",
                question: "The agent felt warm rather than cold.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "phEmpathetic",
                question: "The agent felt empathetic rather than apathetic.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "saSatisfied",
                question: "Overall, I was satisfied with the conversation.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
        ],
        paragraph: "Please indicate how much you agree with each of the following statements about your conversation with the AI agent."
    },
    // Page 8: Perceived Manipulation + Willingness to Engage + Open-ended
    {
        questions: [
            {
                type: "rating",
                name: "pmChangingViews",
                question: "The agent was trying to change my political views.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "pmHiddenAgenda",
                question: "I felt like the agent had a hidden agenda.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "pmHonestIntentions",
                question: "The agent was honest about its intentions.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "weWillingToDiscuss",
                question: "After this conversation, I would be more willing to discuss politics with someone from the opposing party.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "weMoreOpen",
                question: "I feel more open to hearing the opposing party's perspective than before.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "rating",
                name: "weMoreConversations",
                question: "I would be interested in having more conversations like this one.",
                min: 1,
                max: 7,
                minLabel: "Strongly disagree",
                maxLabel: "Strongly agree"
            },
            {
                type: "text",
                name: "oqExperience",
                question: "Is there anything else you would like to share about your experience discussing politics with the AI agent?",
            },
            {
                type: "text",
                name: "oqMemorable",
                question: "What was the most memorable moment or topic from your conversation with the agent?",
            },
            {
                type: "text",
                name: "oqAttitudeChange",
                question: "Did the conversation change how you think about the opposing party in any way? If so, how?",
            },
        ],
        paragraph: "Please indicate how much you agree with each of the following statements."
    },
];
