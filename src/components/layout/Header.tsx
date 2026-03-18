"use client";

import Image from "next/image";
import { useProgress } from "./ProgressContext";
import { routeToState } from "@/src/lib/state/client";
import { useRouter } from "next/navigation";

export default function Header({ id }: { id: string; }) {
    const { percentage } = useProgress();
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-[#F5F5F5] h-17.5 flex items-center justify-between px-5">
                <Image
                    src="/hat.png"
                    alt="HAT Logo"
                    width={100}
                    height={100}
                    className="w-auto h-7/12 object-contain"
                />
                <button
                    type="button"
                    className="btn-blue"
                    onClick={() => routeToState(router, id, "complete")}>
                    I wish to withdraw
                </button>
            </div>

            <div className="w-full h-2 bg-[#E0E0E0]">
                <div
                    className="bg-[#4A90E2] h-full transition-all duration-200"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </header>
    );
}