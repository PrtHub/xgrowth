import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import EngagementContent from "./engagement-content";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function EngagementPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/");
    }

    return <EngagementContent userId={session.userId as Id<"users">} />;
}
