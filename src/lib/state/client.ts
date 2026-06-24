"use client";

import { statePath } from "./shared";
import api from "../api";
import { State } from "@/src/types/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// This study flow is strictly one-way: every transition retires the page the
// user is leaving, so the browser back button can never return to a step
// that's already been submitted (consent, pre-survey, intervention, etc).
export const routeToState = async (router: AppRouterInstance, id: string, state: State) => {
    await api.user.advanceUserState(id, { state });
    router.replace(`/${id}/${statePath[state]}`);
};