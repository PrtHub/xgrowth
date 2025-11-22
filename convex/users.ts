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
    followers: v.optional(v.number()),
    impressions: v.optional(v.number()),
    image: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_twitterId", (q) => q.eq("twitterId", args.twitterId))
      .first();

    let userId = existingUser?._id;

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        username: args.username,
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        tokenExpiresAt: args.tokenExpiresAt,
        followers: args.followers,
        image: args.image,
      });
    } else {
      userId = await ctx.db.insert("users", {
        twitterId: args.twitterId,
        name: args.name,
        username: args.username,
        accessToken: args.accessToken,
        refreshToken: args.refreshToken,
        tokenExpiresAt: args.tokenExpiresAt,
        subscriptionStatus: "active",
        followers: args.followers,
        image: args.image,
      });
    }

    // Update daily stats if provided
    if (userId && args.followers !== undefined) {
      const date = new Date().toISOString().split("T")[0];
      const existingStats = await ctx.db
        .query("dailyStats")
        .withIndex("by_userId_date", (q) =>
          q.eq("userId", userId!).eq("date", date)
        )
        .first();

      if (existingStats) {
        await ctx.db.patch(existingStats._id, {
          followers: args.followers,
          impressions: args.impressions || 0,
        });
      } else {
        await ctx.db.insert("dailyStats", {
          userId: userId!,
          date,
          followers: args.followers,
          impressions: args.impressions || 0,
        });
      }
    }

    return userId;
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

export const updateUserStats = internalMutation({
  args: {
    userId: v.id("users"),
    followers: v.number(),
    impressions: v.number(),
  },
  handler: async (ctx, args) => {
    // Update user record
    await ctx.db.patch(args.userId, {
      followers: args.followers,
    });

    // Update daily stats
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
