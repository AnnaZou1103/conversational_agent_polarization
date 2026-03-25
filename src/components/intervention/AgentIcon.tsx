export default function AgentIcon({ width, height }: { width: number, height: number; }) {
    return (
        <div
            style={{ width, height, fontSize: width * 0.45 }}
            className="rounded-full bg-black text-white flex items-center justify-center shrink-0">A</div>
    );
}