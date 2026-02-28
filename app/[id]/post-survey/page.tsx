import Survey from "@/src/components/survey/Survey";
import { postSurveyPages } from "../../../src/config/surveyConfig";
import { checkState } from "@/src/lib/state/server";

export default async function PostSurvey({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "post_survey");

    return (
        <Survey id={id} surveyType="post" surveyPage={postSurveyPages} />
    );
}