"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Zap, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Engagement", href: "/dashboard/engagement", icon: MessageSquare },
    { name: "Hooks", href: "/dashboard/hooks", icon: Zap },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
    userId?: Id<"users">;
}

export function Sidebar({ userId }: SidebarProps) {
    const pathname = usePathname();
    const user = useQuery(api.users.getUserById, userId ? { userId } : "skip");

    return (
        <div className="flex h-full w-64 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex h-16 items-center px-6">
                <h1 className="bg-linear-gradient-to-r from-primary to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
                    X Growth
                </h1>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "mr-3 h-5 w-5 shrink-0",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-white/10 p-4 space-y-4">
                {user && (
                    <div className="flex items-center gap-3 px-2">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="h-8 w-8 rounded-full border border-white/10 object-cover"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-linear-gradient-to-br from-primary to-purple-400" />
                        )}
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
                            <span className="truncate text-xs text-muted-foreground">@{user.username}</span>
                        </div>
                    </div>
                )}
                <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-white/5"
                >
                    <Link href="/api/auth/logout">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Link>
                </Button>
            </div>
        </div>
    );
}
