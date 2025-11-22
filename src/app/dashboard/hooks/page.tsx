import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HooksContent from "./hooks-content";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function HooksPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/");
    }

    return <HooksContent userId={session.userId as Id<"users">} />;
}
