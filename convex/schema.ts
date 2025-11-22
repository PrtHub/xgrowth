import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    twitterId: v.string(),
    name: v.string(),
    username: v.string(),
    accessToken: v.string(),
    refreshToken: v.string(),
    tokenExpiresAt: v.number(),
    subscriptionStatus: v.string(), // 'active'
    followers: v.optional(v.number()),
    impressions: v.optional(v.number()),
    image: v.optional(v.string()),
  }).index("by_twitterId", ["twitterId"]),

  targets: defineTable({
    username: v.string(),
    twitterId: v.string(),
    category: v.string(), // 'indie_hacker', 'nextjs', 'saas'
    lastFetchedAt: v.optional(v.number()),
  }).index("by_username", ["username"]),

  replies: defineTable({
    userId: v.id("users"),
    targetTweetId: v.string(),
    targetUsername: v.string(),
    targetTweetText: v.string(),
    generatedReply: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("posted"),
      v.literal("rejected")
    ),
    postedTweetId: v.optional(v.string()),
  }).index("by_status", ["status"]),

  hooks: defineTable({
    userId: v.id("users"),
    content: v.string(), // Markdown/Thread content
    type: v.string(), // 'thread', 'hook'
    isUsed: v.boolean(),
    generatedAt: v.number(),
  }),

  dailyStats: defineTable({
    userId: v.id("users"),
    date: v.string(), // YYYY-MM-DD
    followers: v.number(),
    impressions: v.number(),
  }).index("by_userId_date", ["userId", "date"]),

  tweetNotifications: defineTable({
    tweetId: v.string(),
    userId: v.id("users"),
    notifiedAt: v.number(),
  }).index("by_tweetId", ["tweetId"]),
});
