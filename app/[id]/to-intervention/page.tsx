import TransitionPage from "@/src/components/transition/TransitionPage";
import { transitionMessages } from "@/src/config/messageConfig";
import { checkState } from "@/src/lib/state/server";

export default async function TransitionToIntervention({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "to_intervention");

    return <TransitionPage id={id} progressKey="to-intervention" destination="intervention" content={transitionMessages.toIntervention} />;
}
