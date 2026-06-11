import { QuizQuestion } from '@/src/types/interfaces';

const SCALE_LABELS = ['', 'Never', 'Probably not', 'Probably', 'Definitely'];

const labelFor = (value: number) => SCALE_LABELS[Math.round(value)] ?? '—';

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
                                Your answer:{' '}
                                <span className="font-semibold text-[#3a3a3a]">
                                    {labelFor(question.userAnswer)}
                                </span>
                            </span>
                            <span>
                                Survey result:{' '}
                                <span className="font-semibold text-[#3a3a3a]">
                                    {labelFor(question.surveyAverage)} ({question.surveyAverage.toFixed(1)})
                                </span>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
