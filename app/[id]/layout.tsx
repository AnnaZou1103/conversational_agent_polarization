import Header from "@/src/components/layout/Header";
import api from "@/src/utils/api";
import { redirect } from "next/navigation";

export default async function RootLayout({ params, children }: {
    params: Promise<{ id: string; }>;
    children: React.ReactNode;
}) {
    const { id } = await params;
    const response = await api.user.validateStudyID(id);
    if (!response.ok) redirect("/");
    return (
        <>
            <Header id={id} />
            {children}
        </>
    );
}
