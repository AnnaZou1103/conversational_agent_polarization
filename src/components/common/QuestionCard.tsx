export default function QuestionCard({ question, children }: { question: string, children: React.ReactNode; }) {
    return (
        <section className="card-container">
            <h1 className="text-question mb-4 whitespace-pre-line">{question}</h1>
            {children}
        </section>
    );
}
