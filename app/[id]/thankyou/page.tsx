import MessageCard from "@/src/components/common/MessageCard";
import { thankyouMessage } from "@/src/config/messageConfig";

export default function ThankYouPage() {
    return (
        <MessageCard>
            <span className="text-5xl">🎉</span>
            <h1 className="text-2xl font-semibold text-gray-800">{thankyouMessage}</h1>
        </MessageCard>
    );

}