import InstructionPage from "@/src/components/instruction/InstructionPage";
import { checkState } from "@/src/utils/state/server";

export default async function Instruction({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    await checkState(id, "not_started");

    return <InstructionPage id={id} />;
}