"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function HooksPage() {
    const hooks = useQuery(api.hooks.getHooks);
    const generateHooks = useAction(api.dailyHooks.generate);
    const [isGenerating, setIsGenerating] = useState(false);

    // Get today's hooks (last 3)
    const todayHooks = hooks?.slice(-3).reverse() || [];

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            await generateHooks({});
            toast.success("Fresh hooks generated! 🔥");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to generate hooks");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard! 📋");
    };

    const handlePostThread = (content: string) => {
        // For now, just copy. In future, could integrate X API to post directly
        navigator.clipboard.writeText(content);
        toast.info("Copied! Paste it on X to post 🚀");
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <Toaster position="top-right" richColors />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Daily Hooks</h1>
                    <p className="text-muted-foreground">Viral content ideas for your X account</p>
                </div>
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-linear-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
                >
                    {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    {isGenerating ? "Generating..." : "Generate New Hooks"}
                </Button>
            </div>

            {todayHooks.length === 0 ? (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground mb-4">No hooks yet. Generate your first batch!</p>
                        <Button
                            onClick={handleGenerate}
                            className="bg-linear-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Generate Hooks
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                    {todayHooks.map((hook, index) => (
                        <Card
                            key={hook._id}
                            className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold">
                                        {index + 1}
                                    </span>
                                    Hook #{index + 1}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-lg bg-black/20 border border-white/10">
                                    <p className="text-white text-base leading-relaxed whitespace-pre-wrap">
                                        {hook.content}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleCopy(hook.content)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 border-white/10"
                                    >
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => handlePostThread(hook.content)}
                                        className="flex-1 bg-linear-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Post as Thread
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <div className="mt-8 p-6 rounded-lg bg-linear-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <h3 className="text-lg font-semibold mb-2">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Hooks are generated daily at 8 AM IST automatically</li>
                    <li>• Use "Copy" to grab the text, then customize before posting</li>
                    <li>• "Post as Thread" copies the hook - paste it on X to share</li>
                    <li>• Mix personal stories with these hooks for maximum engagement</li>
                </ul>
            </div>
        </div>
    );
}
