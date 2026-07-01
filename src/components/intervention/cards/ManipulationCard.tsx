import { ChatObservation, CIObservation, ControlObservation, ControlPoliticsObservation, MCObservation, PNObservation, Strategy } from "@/src/types/interfaces";
import CommonIdentityCard from "./CommonIdentityCard";
import CharacterCard from "./CharacterCard";
import QuizResultList from "./QuizResultList";
import WellbeingCard from "./WellbeingCard";
import PoliticsControlCard from "./PoliticsControlCard";

export default function ManipulationCard({ strategy, chatObservation }: { strategy: Strategy, chatObservation?: ChatObservation; }) {
    const card = () => {
        if (!chatObservation) return null;
        console.log(chatObservation);
        switch (strategy) {
            case "common_identity":
                return <CommonIdentityCard observation={chatObservation.observation as CIObservation} />;
            case "personal_narrative":
                return <CharacterCard observation={chatObservation.observation as PNObservation} />;
            case "misperception_correction":
                return <QuizResultList questions={(chatObservation.observation as MCObservation).questions} />;
            case "control":
                return <WellbeingCard observation={chatObservation.observation as ControlObservation} />;
            case "control_politics":
                return <PoliticsControlCard observation={chatObservation.observation as ControlPoliticsObservation} />;
        }
    };

    return (
        <div className="flex-1">
            {card()}
        </div>
    );
}