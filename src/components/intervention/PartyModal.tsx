"use client";

import api from "@/src/lib/api";
import { routeToState } from "@/src/lib/state/client";
import { Party } from "@/src/types/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PartyModal({ id, onSubmit }: { id: string, onSubmit: Function; }) {
    const router = useRouter();
    const [selectedParty, setSelectedParty] = useState<Party>();
    const [loading, setLoading] = useState<boolean>(false);

    const submitExperimentParty = async () => {
        if (!selectedParty || loading) return;

        try {
            setLoading(true);
            await api.user.saveUserParty(id, { party: selectedParty });
        } catch (err) {
            console.log(err);
        } finally {
            onSubmit();
            setLoading(false);
        }

    };

    return (
        <main className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <section className="bg-white rounded-2xl w-xl">
                <header className="flex flex-row justify-between item-center p-6 border-b border-gray-200">
                    <h3 className="text-subtitle">Choose Your Party Affiliation</h3>
                </header>

                <div className="p-6 flex justify-between gap-3">
                    <button
                        className={`
                            w-full h-15 
                            ${selectedParty === "republican" ? "border-2" : "border"}
                            ${selectedParty === "republican" ? "border-[#2563EB]" : "border-gray-500"}
                            hover:border-2 cursor-pointer 
                            text-black text-base font-semibold rounded-lg transition-colors`}
                        onClick={() => setSelectedParty("republican")}>
                        Republican
                    </button>
                    <button
                        className={`
                            w-full h-15
                            ${selectedParty === "democrat" ? "border-2" : "border"}
                            ${selectedParty === "democrat" ? "border-[#2563EB]" : "border-gray-500"}
                            hover:border-2 cursor-pointer 
                            text-black text-base font-semibold rounded-lg transition-colors`}
                        onClick={() => setSelectedParty("democrat")}>
                        Democrat
                    </button>
                </div>

                <footer className="flex justify-between p-6 border-t border-gray-200">
                    <button
                        className="btn-zinc"
                        onClick={() => routeToState(router, id, "complete")}>
                        Withdraw
                    </button>
                    <button
                        className="btn-blue"
                        onClick={submitExperimentParty}
                        disabled={!selectedParty || loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </footer>
            </section>
        </main>
    );
}