import ConsentFormPage from "@/src/components/consentForm/ConsentFormPage";
import { checkState } from "@/src/utils/state/server";

export default async function ConsentForm({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "not_started");

    return <ConsentFormPage id={id} />;
}