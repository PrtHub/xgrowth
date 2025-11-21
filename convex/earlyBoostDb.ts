import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getTweetNotification = query({
  args: { tweetId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tweetNotifications")
      .filter((q) => q.eq(q.field("tweetId"), args.tweetId))
      .first();
  },
});

export const markAsNotified = internalMutation({
  args: {
    tweetId: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tweetNotifications", {
      tweetId: args.tweetId,
      userId: args.userId,
      notifiedAt: Date.now(),
    });
  },
});
