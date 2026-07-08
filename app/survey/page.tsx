import api from "@/src/lib/api";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SurveyPage({
    searchParams,
}: {
    searchParams: Promise<{ strategy?: string; participantId?: string; assignmentId?: string; projectId?: string }>;
}) {
    const { strategy, participantId, assignmentId, projectId } = await searchParams;
    const id = await api.user.createStudyUser(strategy, { participantId, assignmentId, projectId });
    redirect(`/${id}`);
}
