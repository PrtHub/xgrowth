"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

interface HooksContentProps {
    userId: Id<"users">;
}

export default function HooksContent({ userId }: HooksContentProps) {
    const hooks = useQuery(api.hooks.getHooks, { userId });
    const generate = useAction(api.dailyHooks.generate);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Morning Hooks</h2>
                <Button
                    onClick={() => generate({ userId })} // Pass userId if needed, but action might assume context or args
                    className="bg-linear-gradient-to-r from-primary to-purple-500 text-white hover:opacity-90"
                >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate New Hooks
                </Button>
            </div>

            <div className="grid gap-4">
                {hooks?.map((hook) => (
                    <Card key={hook._id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {hook.type === "thread" ? "Thread Starter" : "Hook"}
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(hook.content)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium">{hook.content}</p>
                        </CardContent>
                    </Card>
                ))}
                {hooks?.length === 0 && (
                    <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-muted-foreground">
                        <p>No hooks generated yet. Click the button above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
