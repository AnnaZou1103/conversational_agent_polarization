export default function MessageCard({ children }: { children: React.ReactNode; }) {
    return (
        <main className="flex items-center justify-center py-8">
            <div className="card-container flex flex-col items-center gap-4 shadow-[0px_2px_12px_rgba(0,0,0,0.08)]">
                {children}
            </div>
        </main>
    );
}