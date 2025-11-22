import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardContent from "./dashboard-content";
import { Id } from "../../../convex/_generated/dataModel";

export default async function DashboardPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/");
    }

    return <DashboardContent userId={session.userId as Id<"users">} />;
}
