# Survey Question Key Reference

Maps each `name` key in [surveyConfig.tsx](../src/config/surveyConfig.tsx) to its full question text, type, and the recorded value(s). For `likert`/`semanticDifferential` items, the parent question stem is shown once, followed by each statement/item key. "Recorded value" reflects what is actually stored in the response object: `choice` stores the full option text; `scale`/`rating`/`likert`/`semanticDifferential` store the selected numeric value as a string; `text` stores the raw input.

## Pre-Survey

| Key | Type | Question / Statement | Recorded Value (Possible Options) |
|---|---|---|---|
| `AIFrequency` | choice | How often do you use AI tools such as ChatGPT, Gemini, Claude, or similar systems? | "1 - Never" \| "2 - Less than once a month" \| "3 - A few times per month" \| "4 - A few times per week" \| "5 - Daily or almost daily" |
| `partyIdentification` | choice | Generally speaking, do you think of yourself as a Republican, a Democrat, an Independent, or something else? | "Republican" \| "Democrat" \| "Independent/Other" |
| `strongRepublican` | choice | Would you call yourself a strong Republican or a not very strong Republican? *(shown if Republican)* | "Not very strong Republican" \| "Strong Republican" |
| `strongDemocrat` | choice | Would you call yourself a strong Democrat or a not very strong Democrat? *(shown if Democrat)* | "Not very strong Democrat" \| "Strong Democrat" |
| `closerParty` | scale | Do you think of yourself as closer to the Republican Party or the Democratic Party? *(shown if Independent/Other)* | -50 to 50 (-50 = Closer to Republican Party, 0 = Neither, 50 = Closer to Democratic Party) |
| `similarityToOutgroup` | scale | How similar are you to [Democrats/Republicans]? | 0 to 100 (0 = Not similar at all, 50 = Moderately similar, 100 = Extremely similar) |
| `partyImportance` | scale | How important is being a [Republican/Democrat] to you? | 0 to 100 (0 = Not important at all, 50 = Moderately important, 100 = Extremely important) |
| `angerTowardOutgroup` | scale | How much anger do you feel toward [Democrats/Republicans]? | 0 to 100 (0 = No anger at all, 50 = A moderate amount, 100 = A great deal) |
| `empathyTowardOutgroup` | scale | How much empathy do you feel toward [Democrats/Republicans]? | 0 to 100 (0 = No empathy at all, 50 = A moderate amount, 100 = A great deal) |
| `commonEnemy` | scale | *(currently commented out)* To what extent should Democrats and Republicans see themselves as united against a common enemy? | 0 to 100 (0 = Not at all, 50 = A moderate amount, 100 = A great deal) |
| `threatPerception` | scale | *(currently commented out)* To what extent do you view [Democrats/Republicans] as a serious threat to the country's well-being? | 0 to 100 (0 = Not at all, 50 = A moderate amount, 100 = A great deal) |
| `rateRepublicansPre` | scale | How would you rate Republicans? (feeling thermometer) | 0 to 100 (0 = Very cold/unfavorable, 50 = Neutral, 100 = Very warm/favorable) |
| `rateDemocratsPre` | scale | How would you rate Democrats? (feeling thermometer) | 0 to 100 (0 = Very cold/unfavorable, 50 = Neutral, 100 = Very warm/favorable) |
| `preSurveyAttentionCheck` | choice | Attention check: "select '4 - Somewhat disagree'" | "1 - Strongly agree" \| "2 - Somewhat agree" \| "3 - No opinion" \| "4 - Somewhat disagree" \| "5 - Strongly disagree" |

## Post-Survey

| Key | Type | Question / Statement | Recorded Value (Possible Options) |
|---|---|---|---|
| `conversationEmotions` | likert | After the conversation, how much do you feel each of the following emotions? | 1 to 7 (1 = Not at all ... 7 = Very much) |
| &nbsp;&nbsp;`emotionEnthusiastic` | (statement) | Enthusiastic | 1–7 |
| &nbsp;&nbsp;`emotionHappy` | (statement) | Happy | 1–7 |
| &nbsp;&nbsp;`emotionCalm` | (statement) | Calm | 1–7 |
| &nbsp;&nbsp;`emotionDull` | (statement) | Dull | 1–7 |
| &nbsp;&nbsp;`emotionAngry` | (statement) | Angry | 1–7 |
| &nbsp;&nbsp;`emotionSad` | (statement) | Sad | 1–7 |
| `completedTask` | choice | What was the main topic of your conversation with the AI agent? | "Frustration and exhaustion with political conflict." \| "A person from the opposing party whom I liked." \| "A quiz about the opposing party's beliefs." \| "None of above" |
| `rateRepublicansPost` | scale | How would you rate Republicans? (feeling thermometer) | 0 to 100 (0 = Very cold/unfavorable, 50 = Neutral, 100 = Very warm/favorable) |
| `rateDemocratsPost` | scale | How would you rate Democrats? (feeling thermometer) | 0 to 100 (0 = Very cold/unfavorable, 50 = Neutral, 100 = Very warm/favorable) |
| `giveCents` | scale | How many cents (if any) would you give to the [Democrat/Republican] participant? | 0 to 50 |
| `reducePollStations` | scale | [Republicans/Democrats] should reduce the number of polling stations in areas that support [Democrats/Republicans]. | 0 to 100 (0 = Strongly disagree, 50 = Neither, 100 = Strongly agree) |
| `ignoreUnfavorableJudges` | scale | [Republican/Democrat] governors should ignore unfavorable court rulings by [Democratic/Republican]-appointed judges. | 0 to 100 (0 = Strongly disagree, 50 = Neither, 100 = Strongly agree) |
| `prosecuteJournalists` | scale | [Republican/Democratic] governors should prosecute journalists who accuse [Republican/Democratic] politicians of misconduct without revealing sources. | 0 to 100 (0 = Strongly disagree, 50 = Neither, 100 = Strongly agree) |
| `acceptElectionResults` | scale | [Republicans/Democrats] should not accept the results of elections if they lose. | 0 to 100 (0 = Strongly disagree, 50 = Neither, 100 = Strongly agree) |
| `postSurveyAttentionCheck1` | choice | Attention check: "select '2-Somewhat agree'" | "1-Strongly agree" \| "2-Somewhat agree" \| "3-No opinion" \| "4-Somewhat disagree" \| "5-Strongly disagree" |
| `sendThreateningMessages` | scale | *(replaced by the Opposition to Bipartisanship & Social Distance page below)* When, if ever, is it OK for [Republicans/Democrats] to send threatening and intimidating messages to [Democrat/Republican] party leaders? | 0 to 100 (0 = Never, 100 = Always) |
| `publicHarass` | scale | *(replaced by the Opposition to Bipartisanship & Social Distance page below)* When, if ever, is it OK for an ordinary [Republican/Democrat] in the public to harass an ordinary [Democrat/Republican] on the Internet, in a way that makes the target feel frightened? | 0 to 100 (0 = Never, 100 = Always) |
| `violenceForGoals` | scale | *(replaced by the Opposition to Bipartisanship & Social Distance page below)* How much do you feel it is justified for [Republicans/Democrats] to use violence in advancing their political goals these days? | 0 to 100 (0 = Not justified at all, 50 = Moderately justified, 100 = Extremely justified) |
| `violenceForElection` | scale | *(replaced by the Opposition to Bipartisanship & Social Distance page below)* How much do you feel it is justified for [Republicans/Democrats] to use violence if the [Democrat/Republican] party wins more races in the next election? | 0 to 100 (0 = Not justified at all, 50 = Moderately justified, 100 = Extremely justified) |
| `bipartisanRepsCooperation` | scale | To what extent would you like to see Democratic and Republican elected representatives work together? | 0 to 100 (0 = Not at all, 50 = Somewhat, 100 = A great deal) |
| `bipartisanCompromiseCooperation` | scale | To what extent would you like the Democratic and Republican parties to cooperate more, even if it means compromising on issues you care about? | 0 to 100 (0 = Not at all, 50 = Somewhat, 100 = A great deal) |
| `comfortFriendsOutgroup` | scale | How comfortable are you having close personal friends who are [Democrats/Republicans]? | 0 to 100 (0 = Not at all comfortable, 50 = Moderately comfortable, 100 = Extremely comfortable) |
| `comfortNeighborsOutgroup` | scale | How comfortable are you having neighbors on your street who are [Democrats/Republicans]? | 0 to 100 (0 = Not at all comfortable, 50 = Moderately comfortable, 100 = Extremely comfortable) |
| `conversationExperience` | likert | Please indicate how much you agree with each of the following statements about your conversation with the AI agent. | 1 to 7 (1 = Strongly disagree ... 7 = Strongly agree) |
| &nbsp;&nbsp;`ceEasyToUnderstand` | (statement) | The agent's responses were easy to understand. | 1–7 |
| &nbsp;&nbsp;`ceClearCommunication` | (statement) | Communicating with the agent was clear. | 1–7 |
| &nbsp;&nbsp;`ceKeptContext` | (statement) | The agent was able to keep track of context. | 1–7 |
| &nbsp;&nbsp;`postSurveyAttentionCheck2` | (statement) | Attention check: "select '3-Somewhat disagree'" | 1–7 |
| `agentImpression` | semanticDifferential | Based on your interaction with the AI agent, please indicate where your impression falls between each pair of adjectives below. | 1 to 7 (1 = left label ... 7 = right label) |
| &nbsp;&nbsp;`impressionFakeNatural` | (statement) | Fake — Natural | 1–7 |
| &nbsp;&nbsp;`impressionMachinelikeHumanlike` | (statement) | Machinelike — Humanlike | 1–7 |
| &nbsp;&nbsp;`impressionUnconsciousConscious` | (statement) | Unconscious — Conscious | 1–7 |
| `feltHeard` | likert | During this conversation, how much do you agree with each of the following statements about the AI agent? | 1 to 7 (1 = Strongly disagree ... 7 = Strongly agree) |
| &nbsp;&nbsp;`fhListened` | (statement) | The AI agent really listened to me. | 1–7 |
| &nbsp;&nbsp;`fhInterested` | (statement) | The AI agent seemed interested in what I was thinking and feeling. | 1–7 |
| &nbsp;&nbsp;`fhUnderstoodPerspective` | (statement) | The AI agent tried to understand where I was coming from. | 1–7 |
| &nbsp;&nbsp;`fhUnderstanding` | (statement) | The AI agent was understanding. | 1–7 |
| &nbsp;&nbsp;`fhResponsive` | (statement) | The AI agent was responsive to me. | 1–7 |
| `trustInAgent` | likert | Please indicate how much you agree with each of the following statements about the AI agent. | 1 to 7 (1 = Strongly disagree ... 7 = Strongly agree) |
| &nbsp;&nbsp;`taSuspicious` | (statement) | I am suspicious of the AI agent's intent, action, or output. | 1–7 |
| &nbsp;&nbsp;`taWary` | (statement) | I am wary of the AI agent. | 1–7 |
| &nbsp;&nbsp;`taConfident` | (statement) | I am confident in the AI agent. | 1–7 |
| &nbsp;&nbsp;`taIntegrity` | (statement) | The agent has integrity. | 1–7 |
| &nbsp;&nbsp;`taDependable` | (statement) | The agent is dependable. | 1–7 |
| &nbsp;&nbsp;`taReliable` | (statement) | The agent is reliable. | 1–7 |
| &nbsp;&nbsp;`taTrust` | (statement) | I can trust the agent. | 1–7 |
| `manipulationAndEngagement` | likert | Please indicate how much you agree with each of the following statements. | 1 to 7 (1 = Strongly disagree ... 7 = Strongly agree) |
| &nbsp;&nbsp;`maeChangingViews` | (statement) | *(replaced by the statements below)* The agent was trying to change my political views. | 1–7 |
| &nbsp;&nbsp;`maeHiddenAgenda` | (statement) | *(replaced by the statements below)* I felt like the agent had a hidden agenda. | 1–7 |
| &nbsp;&nbsp;`maeHonestIntentions` | (statement) | *(replaced by the statements below)* The agent was honest about its intentions. | 1–7 |
| &nbsp;&nbsp;`maeWillingToDiscuss` | (statement) | *(replaced by the statements below)* After this conversation, I would be more willing to discuss politics with someone from the opposing party. | 1–7 |
| &nbsp;&nbsp;`maeMoreOpen` | (statement) | *(replaced by the statements below)* I feel more open to hearing the opposing party's perspective than before. | 1–7 |
| &nbsp;&nbsp;`maeMoreConversations` | (statement) | *(replaced by the statements below)* I would be interested in having more conversations like this one. | 1–7 |
| &nbsp;&nbsp;`maePersuasionAcceptable` | (statement) | The way the agent tried to persuade me seemed acceptable. | 1–7 |
| &nbsp;&nbsp;`maeUnwantedManipulation` | (statement) | The agent tried to manipulate me in ways that I didn't like. | 1–7 |
| &nbsp;&nbsp;`maeAnnoyedControl` | (statement) | I was annoyed because the agent seemed to be trying to inappropriately manage or control the conversation. | 1–7 |
| &nbsp;&nbsp;`maeApproachOkay` | (statement) | I didn't mind the agent's approach; it tried to be persuasive without being excessively manipulative. | 1–7 |
| &nbsp;&nbsp;`maeFair` | (statement) | The agent was fair in what it said. | 1–7 |
| `weWillingFuture` | rating | I would be willing to discuss similar topics with an AI agent like this in the future. | 1 to 7 (1 = Strongly disagree, 7 = Strongly agree) |
| `oqWillingFutureWhy` | text | Please briefly explain why you would or would not be willing to discuss similar topics with an AI agent like this in the future. | free text |
| `saSatisfiedOverall` | rating | Overall, I was satisfied with my conversation experience with the AI agent. | 1 to 7 (1 = Strongly disagree, 7 = Strongly agree) |
| `oqSatisfiedWhy` | text | Please briefly explain what made you satisfied or dissatisfied with your conversation experience with the AI agent. | free text |
| `attitudeChangeSelf` | rating | To what extent did the conversation change how you think about the opposing party? | 1 to 7 (1 = Not at all, 7 = A great deal) |
| `oqAttitudeChangeSelfWhy` | text | Please briefly explain how, if at all, the conversation changed how you think about the opposing party. | free text |
| `attitudeChangeOthers` | rating | *(replaced by the two rows below)* To what extent do you think the conversation would change how other people think about the opposing party? | 1 to 7 (1 = Not at all, 7 = A great deal) |
| `attitudeChangeInParty` | rating | If other members of your political party had a similar conversation, to what extent do you think it would change how they view the opposing party? | 1 to 7 (1 = Not at all, 7 = A great deal) |
| `oqAttitudeChangeOutParty` | text | If members of the opposing political party had a similar conversation, to what extent do you think it would change how they view your party? | free text |
| `oqImprove` | text | *(replaced by the row below)* Is there anything else you would like to share about how we could improve the AI agent? | free text |
| `oqAttitudeChangeOthersWhy` | text | Please briefly explain why you think a similar conversation would or would not change how members of either political party view the other party. | free text |
