import { UserState, ValidState } from "@/src/types/interfaces";
import { redirect } from "next/navigation";
import api from "../api";


export const checkState = async (id: string, currState: ValidState) => {
    const response = await api.user.getUserState(id);
    const userState: UserState = await response.json();
    if (userState.state !== currState) {
        redirect(`/${id}`);
    }
};