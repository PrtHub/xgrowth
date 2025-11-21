import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

export const storeUser = mutation({
  args: {
    twitterId: v.string(),
    name: v.string(),
    username: v.string(),
    accessToken: v.string(),
    refreshToken: v.string(),
    tokenExpiresAt: v.number(),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_twitterId", (q) => q.eq("twitterId", args.twitterId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        username: args.username,
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        tokenExpiresAt: args.tokenExpiresAt,
      });
      return existingUser._id;
    } else {
      const newUserId = await ctx.db.insert("users", {
        twitterId: args.twitterId,
        name: args.name,
        username: args.username,
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        tokenExpiresAt: args.tokenExpiresAt,
        subscriptionStatus: "active", // Default to active for MVP
      });
      return newUserId;
    }
  },
});

export const getUser = query({
  args: { twitterId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_twitterId", (q) => q.eq("twitterId", args.twitterId))
      .first();
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const updateStats = internalMutation({
  args: {
    userId: v.id("users"),
    followers: v.number(),
    impressions: v.number(),
  },
  handler: async (ctx, args) => {
    const date = new Date().toISOString().split("T")[0];

    const existing = await ctx.db
      .query("dailyStats")
      .withIndex("by_userId_date", (q) =>
        q.eq("userId", args.userId).eq("date", date)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        followers: args.followers,
        impressions: args.impressions,
      });
    } else {
      await ctx.db.insert("dailyStats", {
        userId: args.userId,
        date,
        followers: args.followers,
        impressions: args.impressions,
      });
    }
  },
});

export const getStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get last 30 days
    return await ctx.db
      .query("dailyStats")
      .withIndex("by_userId_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(30);
  },
});
