"use client";

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Send, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Id, Doc } from "../../../convex/_generated/dataModel";

export default function EngagePage() {
    const pendingReplies = useQuery(api.engagementDb.getPendingReplies);
    const fetchPosts = useAction(api.getFreshPosts.getFreshPosts);
    const postReply = useAction(api.postReply.post);
    const reject = useMutation(api.engagementDb.rejectReply);


    const [isFetching, setIsFetching] = useState(false);
    const [postingIds, setPostingIds] = useState<Set<Id<"replies">>>(new Set());

    const handleFetch = async () => {
        setIsFetching(true);
        try {
            // For MVP, we need to get the user ID. 
            // In a real app, this would come from auth context.
            // For now, we'll use a placeholder that the action will handle.
            await fetchPosts({ userId: "skip" as any });
            toast.success("Fresh posts fetched successfully! 🎉");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to fetch posts");
        } finally {
            setIsFetching(false);
        }
    };

    const handlePost = async (replyId: Id<"replies">, replyText: string, targetTweetId: string) => {
        setPostingIds(prev => new Set(prev).add(replyId));
        try {
            // Same issue with userId - need real auth context
            await postReply({
                replyId,
                userId: "skip" as any,
                replyText,
                targetTweetId,
            });
            toast.success("Reply posted successfully! 🚀");
        } catch (e: any) {
            console.error(e);
            toast.error(e.message || "Failed to post reply");
        } finally {
            setPostingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(replyId);
                return newSet;
            });
        }
    };

    const handleReject = async (replyId: Id<"replies">) => {
        try {
            await reject({ replyId });
            toast.info("Reply rejected");
        } catch (e: any) {
            console.error(e);
            toast.error("Failed to reject reply");
        }
    };

    return (
        <div className="container mx-auto py-10 space-y-8">
            <Toaster position="top-right" richColors />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Auto-Engagement</h1>
                    <p className="text-muted-foreground">Review and approve AI-generated replies.</p>
                </div>
                <Button
                    onClick={handleFetch}
                    disabled={isFetching}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {isFetching ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    {isFetching ? "Fetching..." : "Fetch Fresh Posts"}
                </Button>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Pending Replies</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-white/5 border-white/10">
                                <TableHead className="w-[200px]">Target</TableHead>
                                <TableHead className="w-[300px]">Original Tweet</TableHead>
                                <TableHead>Generated Reply</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingReplies?.map((reply: Doc<"replies">) => {
                                const isPosting = postingIds.has(reply._id);
                                return (
                                    <TableRow key={reply._id} className="hover:bg-white/5 border-white/10">
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>@{reply.targetUsername}</span>
                                                <Badge variant="outline" className="w-fit mt-1 text-xs border-white/20">
                                                    {reply.status}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {reply.targetTweetText}
                                        </TableCell>
                                        <TableCell>
                                            <div className="p-3 rounded-md bg-white/5 text-sm border border-white/10">
                                                {reply.generatedReply}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                onClick={() => handleReject(reply._id)}
                                                disabled={isPosting}
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                                onClick={() => handlePost(reply._id, reply.generatedReply, reply.targetTweetId)}
                                                disabled={isPosting}
                                            >
                                                {isPosting ? (
                                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                ) : (
                                                    <Send className="h-4 w-4 mr-1" />
                                                )}
                                                {isPosting ? "Posting..." : "Post"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {pendingReplies?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No pending replies. Click "Fetch Fresh Posts" to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
