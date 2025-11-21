"use client";

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ReplyCard } from "@/components/engagement/reply-card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

export default function EngagementPage() {
    const pendingReplies = useQuery(api.engagementDb.getPendingReplies);
    const approve = useMutation(api.engagementDb.approveReply);
    const reject = useMutation(api.engagementDb.rejectReply);
    const fetchTweets = useAction(api.engagement.fetchTweets);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Engagement Queue</h2>
                <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => fetchTweets({ userId: "me" as any })} // Need real user ID or context
                >
                    <RefreshCw className="h-4 w-4" />
                    Fetch New Tweets
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingReplies?.map((reply: Doc<"replies">) => (
                    <ReplyCard
                        key={reply._id}
                        reply={reply}
                        onApprove={(id, content) => {
                            approve({ replyId: id as any, content });
                        }}
                        onReject={(id) => {
                            reject({ replyId: id as any });
                        }}
                    />
                ))}
                {pendingReplies?.length === 0 && (
                    <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-muted-foreground">
                        <p>No pending replies. Good job!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
