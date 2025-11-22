"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface HeaderProps {
    userId?: Id<"users">;
}

export function Header({ userId }: HeaderProps) {
    const user = useQuery(api.users.getUserById, userId ? { userId } : "skip");

    return (
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                >
                    <Link href="/api/auth/logout">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </Button>
                {user?.image ? (
                    <img
                        src={user.image}
                        alt={user.name}
                        className="h-8 w-8 rounded-full border border-white/10 object-cover"
                    />
                ) : (
                    <div className="h-8 w-8 rounded-full bg-linear-gradient-to-br from-primary to-purple-400" />
                )}
            </div>
        </header>
    );
}
