import InterventionPage from "@/src/components/intervention/InterventionPage";
import { checkState } from "@/src/lib/state/server";

export default async function Intervention({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "intervention");

    return <InterventionPage id={id} />;
}
