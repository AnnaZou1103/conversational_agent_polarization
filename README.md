# Conversational Agent Polarization

A Next.js research study platform that investigates how conversational AI agents can help reduce political polarization. Participants interact with an AI assistant under one of several experimental conditions designed to bridge partisan divides on divisive issues such as gun control and immigration.

---

## Overview

The study guides participants through a structured workflow:

1. **Consent** — Participants review and accept an IRB-approved informed consent form.
2. **Pre-Survey** — Baseline questions on party affiliation, partisan strength, issue attitudes, and AI usage frequency.
3. **Intervention** — A chat session with an AI agent assigned to one of five strategies (see below).
4. **Post-Survey** — Measures changes in feelings toward the opposing party, polarization perception, and political attitudes.
5. **Completion** — Thank-you page confirming study completion.

The platform supports two modes:
- **Study mode** — Recruited participants with pre-assigned IDs and party affiliations.
- **Experiment mode** — Open participation with dynamic party selection at the start of the chat.

---

## Agent Strategies

| Strategy | Description |
|---|---|
| `common_identity` | Emphasizes shared American identity and common values |
| `personal_narrative` | Encourages sharing and reflecting on personal stories |
| `misperception_correction` | Corrects factual misunderstandings about the opposing party |
| `control` | General wellbeing conversation (non-political) |
| `control_politics` | Politically-focused control condition |

Each strategy has a corresponding **observation card** rendered alongside the chat that visualizes what the agent has inferred about the participant (traits, survey comparisons, shared topics, etc.).

---

## State Machine

Participants advance through the following states, enforced server-side on every page load:

```
not_started → pre_survey → to_intervention → intervention →
to_post_survey → post_survey → complete
```

If a participant navigates to a page that does not match their current state, they are automatically redirected to the correct page.

---

## API

All communication goes through a backend service configured via `NEXT_PUBLIC_API_URL`. The client is defined in [src/lib/api.ts](src/lib/api.ts).

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `GET` | `/user/validate/{id}` | Validate a study ID |
| `GET` | `/user/state/{id}` | Get current participant state |
| `POST` | `/user/advance/{id}` | Advance to the next state |
| `GET` | `/user/party/{id}` | Get participant's party |
| `POST` | `/user/party/{id}` | Save participant's party |
| `GET` | `/user/type/{id}` | Get mode (`study` or `experiment`) |
| `GET` | `/user/agent_strategy/{id}` | Get assigned agent strategy |
| `POST` | `/survey/pre/{id}` | Submit pre-survey responses |
| `POST` | `/survey/post/{id}` | Submit post-survey responses |
| `GET` | `/chat/history/{id}` | Load chat message history |
| `GET` | `/observation/{id}` | Get agent observation data |
| `POST` | `/v1/chat/completions` | Stream chat completions (OpenAI-compatible, SSE) |
| `POST` | `/experiment/generate` | Generate a new experiment participant ID |

---

## Key Components

### `InterventionPage`
Loads the participant's study type and agent strategy, then renders either `ChatContainer` (study mode) or `ExperimentContainer` (experiment mode) alongside the appropriate observation card. Refreshes observation data after each message.

### `ChatContainer` / `ExperimentContainer`
- Initializes the conversation by sending a silent greeting to the agent.
- Streams responses via Server-Sent Events.
- Loads prior chat history on mount.
- `ExperimentContainer` additionally shows `PartyModal` to let participants choose their party before chatting.

### `Survey`
- Paginated survey supporting choice, rating, scale, and Likert question types.
- Deterministic option shuffling using a seeded PRNG tied to the participant ID.
- Applies party-specific text substitution (e.g., `[Republican/Democrat]` → the opposing party label).
- On final submission, saves responses and advances the participant state.

### Observation Cards
| Card | Strategy | What it shows |
|---|---|---|
| `CommonIdentityCard` | `common_identity` | Feelings survey data and shared identity cues |
| `CharacterCard` | `personal_narrative` | Inferred participant profile (traits, memories, background) |
| `RadarChartCard` | `misperception_correction` | Radar chart comparing participant answers to population averages |
| `WellbeingCard` | `control` | Shared topics and current mood |
| `PoliticsControlCard` | `control_politics` | Political topics and mood |

---

## Requirements

### Node.js

Node.js 18 or later is required.

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This must point to the running backend service before the app will function.

### Dependencies

Install all dependencies with:

```bash
npm install
```

Key packages:

| Package | Purpose |
|---|---|
| `next` 16 | Full-stack React framework (App Router) |
| `react` 19 | UI library |
| `typescript` 5 | Type safety |
| `tailwindcss` 4 | Utility-first CSS |
| `@emotion/react` | Component-level CSS-in-JS |
| `@mui/x-charts` | Radar chart visualization |
| `react-markdown` + `remark-gfm` | Markdown rendering in chat |
| `@fontsource/inter` | Inter font |

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To run in experiment mode, navigate to `/experiment` to generate a participant ID, then proceed to `/{id}`.

---

## Progress Tracking

The header displays a step-based progress bar. Total steps: **13**

| Phase | Steps |
|---|---|
| Consent | 1 |
| Pre-survey | 4 |
| Transition (to intervention) | 1 |
| Intervention | 1 |
| Transition (to post-survey) | 1 |
| Post-survey | 4 |
| Thank you | 1 |

---

## License

See [LICENSE](LICENSE).
