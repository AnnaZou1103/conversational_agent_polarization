export default function MessageCard({ children }: { children: React.ReactNode; }) {
    return (
        <main className="flex items-center justify-center py-8">
            <div className="relative card-container flex flex-col items-center gap-4">
                {children}
            </div>
        </main>
    );
}