// TEMPORARY local-only preview route for verifying post-survey content changes
// without going through the AI conversation or the external backend.
// Delete this file when done testing.
import Survey from "@/src/components/survey/Survey";

export default async function DevPostSurveyPreview({
    searchParams,
}: {
    searchParams: Promise<{ party?: string; }>;
}) {
    const { party: partyParam } = await searchParams;
    const party = partyParam === "republican" ? "republican" : "democrat";

    return (
        <Survey id="dev-preview" surveyType="post" party={party} />
    );
}
