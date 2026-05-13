import api from "@/src/lib/api";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SurveyPage({
    searchParams,
}: {
    searchParams: Promise<{ strategy?: string }>;
}) {
    const { strategy } = await searchParams;
    const id = await api.user.createStudyUser(strategy);
    redirect(`/${id}`);
}
