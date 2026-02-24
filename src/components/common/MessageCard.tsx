export default function MessageCard({ children }: { children: React.ReactNode; }) {
    return (
        <main className="flex mt-40 items-center justify-center">
            <div className="flex flex-col max-w-2xl items-start space-y-8 rounded-xl bg-white p-8 shadow-sm">
                {children}
            </div>
        </main>
    );
}