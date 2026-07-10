// TEMPORARY local-only layout for previewing survey pages without the backend.
// Delete when done testing.
import Header from "@/src/components/layout/Header";
import { ProgressProvider } from "@/src/components/layout/ProgressContext";

export default function DevLayout({ children }: { children: React.ReactNode; }) {
    return (
        <ProgressProvider>
            <Header />
            {children}
        </ProgressProvider>
    );
}
