import { QuizQuestion } from '@/src/types/interfaces';

const SCALE_LABELS = ['', 'Never', 'Probably not', 'Probably', 'Definitely'];

// Accept either a numeric 1-4 score (mapped to its scale label) or a ready-made
// string from the backend (rendered as-is).
const labelFor = (value: number | string) => {
    if (typeof value === 'string') return value;
    return SCALE_LABELS[Math.round(value)] ?? '—';
};

export default function QuizResultList({ questions }: { questions: QuizQuestion[]; }) {
    if (!questions || questions.length === 0) {
        return null;
    }

    return (
        <div className="manipulation-card-container">
            <header className="mb-4 pb-4 border-b border-zinc-200 text-xs tracking-widest text-zinc-500 font-bold">
                Conversation Summary
            </header>

            <ul className="flex flex-col gap-4">
                {questions.map((question, index) => (
                    <li
                        key={index}
                        className="pb-4 border-b border-zinc-100 last:border-b-0 last:pb-0"
                    >
                        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#3a3a3a]">
                            {index + 1}. {question.label}
                        </p>
                        <div className="flex flex-col gap-1 text-[13px] text-[#777]">
                            <span>
                                <span className="font-semibold text-[#3a3a3a]">Your answer:</span>{' '}
                                {labelFor(question.userAnswer)}
                            </span>
                            <span>
                                <span className="font-semibold text-[#3a3a3a]">Survey result:</span>{' '}
                                {labelFor(question.surveyAverage)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
