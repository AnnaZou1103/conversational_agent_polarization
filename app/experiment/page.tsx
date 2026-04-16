import api from "@/src/lib/api";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ExperimentPage() {
    const id = await api.experiment.generateExperimentUser();
    redirect(`/${id}`);
}
