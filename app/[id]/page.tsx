import { UserState } from "@/src/types/interfaces";
import api from "@/src/lib/api";
import { statePath } from "@/src/lib/state/shared";
import { redirect } from "next/navigation";

async function getUserPath(id: string) {
    const response = await api.user.getUserState(id);
    if (!response.ok) redirect("/");
    const data: UserState = await response.json();
    return statePath[data.state];
}

export default async function RootPage({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;
    const nextPath = await getUserPath(id);
    if (!nextPath) redirect("/");
    redirect(`/${id}/${nextPath}`);
}
