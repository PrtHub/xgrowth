import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getAuthSession } from "@/lib/auth";
import { Id } from "../../../convex/_generated/dataModel";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getAuthSession();
    const userId = session?.userId as Id<"users">;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
            <Sidebar userId={userId} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header userId={userId} />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
