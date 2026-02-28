import TransitionPage from "@/src/components/transition/TransitionPage";
import { transitionMessages } from "@/src/config/messageConfig";
import { checkState } from "@/src/lib/state/server";

export default async function TransitionToPostSurvey({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "to_post_survey");

    return <TransitionPage id={id} progressKey="to-post-survey" destination="post_survey" content={transitionMessages.toPostSurvey} />;
}
