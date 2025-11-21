"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit2, Send } from "lucide-react";
import { useState } from "react";

interface ReplyCardProps {
    reply: {
        _id: string;
        targetUsername: string;
        targetTweetText: string;
        generatedReply: string;
    };
    onApprove: (id: string, content: string) => void;
    onReject: (id: string) => void;
}

export function ReplyCard({ reply, onApprove, onReject }: ReplyCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(reply.generatedReply);

    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">@{reply.targetUsername}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="rounded-lg bg-white/5 p-3 text-sm text-muted-foreground">
                    {reply.targetTweetText}
                </div>
                {isEditing ? (
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[100px] bg-black/20 border-white/10"
                    />
                ) : (
                    <div className="text-sm">{content}</div>
                )}
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReject(reply._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                </Button>
                {isEditing ? (
                    <Button
                        size="sm"
                        onClick={() => {
                            setIsEditing(false);
                            onApprove(reply._id, content);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Save & Approve
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onApprove(reply._id, content)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Approve
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
