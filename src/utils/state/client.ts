"use client";

import { statePath } from "./shared";
import api from "../api";
import { ValidState } from "@/src/types/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const routeToState = async (router: AppRouterInstance, id: string, state: ValidState) => {
    await api.user.advanceUserState(id, { state });
    router.push(`/${id}/${statePath[state]}`);
};