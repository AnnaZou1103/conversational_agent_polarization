import Survey from "@/src/components/survey/Survey";
import { checkState, getParty } from "@/src/lib/state/server";


export default async function PreSurvey({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "pre_survey");

    return (
        <Survey id={id} surveyType="pre" />
    );
}