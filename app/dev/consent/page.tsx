// TEMPORARY local-only preview route for verifying consent-form content changes
// without a participant id or the external backend. The Continue button still
// calls the backend and will fail here - this route is for reading the page.
// Delete this file when done testing.
import ConsentFormPage from "@/src/components/consentForm/ConsentFormPage";

export default function DevConsentPreview() {
    return <ConsentFormPage id="dev-preview" />;
}
