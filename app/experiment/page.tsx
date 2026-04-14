import api from "@/src/lib/api";
import { redirect } from "next/navigation";

export default async function ExperimentPage() {
    const id = await api.experiment.generateExperimentUser();
    redirect(`/${id}`);
}
