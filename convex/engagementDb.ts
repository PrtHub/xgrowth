import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const createReply = internalMutation({
  args: {
    userId: v.id("users"),
    targetTweetId: v.string(),
    targetUsername: v.string(),
    targetTweetText: v.string(),
    generatedReply: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Check duplicates
    const existing = await ctx.db
      .query("replies")
      .filter((q) =>
        q.and(
          q.eq(q.field("targetTweetId"), args.targetTweetId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .first();

    if (!existing) {
      await ctx.db.insert("replies", {
        userId: args.userId,
        targetTweetId: args.targetTweetId,
        targetUsername: args.targetUsername,
        targetTweetText: args.targetTweetText,
        generatedReply: args.generatedReply,
        status: args.status as "pending" | "approved" | "posted" | "rejected",
      });
    }
  },
});

export const getPendingReplies = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("replies")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const approveReply = mutation({
  args: { replyId: v.id("replies"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.replyId, {
      generatedReply: args.content,
      status: "approved",
    });
  },
});

export const rejectReply = mutation({
  args: { replyId: v.id("replies") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.replyId, {
      status: "rejected",
    });
  },
});

export const markAsPosted = internalMutation({
  args: { replyId: v.id("replies"), postedTweetId: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.replyId, {
      status: "posted",
      postedTweetId: args.postedTweetId,
    });
  },
});
