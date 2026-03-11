import { UserState, State, UserParty } from "@/src/types/interfaces";
import { redirect } from "next/navigation";
import api from "../api";


export const checkState = async (id: string, currState: State) => {
    const response = await api.user.getUserState(id);
    const userState: UserState = await response.json();
    if (userState.state !== currState) {
        redirect(`/${id}`);
    }
};

export const getParty = async (id: string) => {
    const response = await api.user.getUserParty(id);
    const userParty: UserParty = await response.json();
    return userParty.party;
};