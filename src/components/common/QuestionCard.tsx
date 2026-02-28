export default function QuestionCard({ question, children }: { question: string, children: React.ReactNode; }) {
    return (
        <div className="card-container w-full">
            <h1 className="text-question mb-4">{question}</h1>
            {children}
        </div>
    );
}