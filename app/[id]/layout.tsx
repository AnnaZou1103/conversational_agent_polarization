import Header from "@/src/components/layout/Header";
import { ProgressProvider } from "@/src/components/layout/ProgressContext";
import api from "@/src/lib/api";
import { redirect } from "next/navigation";

export default async function RootLayout({ params, children }: {
    params: Promise<{ id: string; }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const response = await api.user.validateStudyID(id);
    if (!response.ok) redirect("/");
    return (
        <ProgressProvider>
            <Header id={id} />
            {children}
        </ProgressProvider>
    );
}
