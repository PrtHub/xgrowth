"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { TwitterApi } from "twitter-api-v2";

export const syncStats = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getUserById, {
      userId: args.userId,
    });

    if (!user || !user.accessToken) {
      throw new Error("User not authenticated");
    }

    const client = new TwitterApi(user.accessToken);

    try {
      const { data: me } = await client.v2.me({
        "user.fields": ["public_metrics"],
      });

      if (me && me.public_metrics) {
        // Update user record and daily stats
        await ctx.runMutation(internal.users.updateUserStats, {
          userId: args.userId,
          followers: me.public_metrics.followers_count || 0,
          impressions: 0, // Placeholder as Twitter API doesn't provide this easily
        });
      }

      return { success: true };
    } catch (e) {
      console.error("Failed to sync stats:", e);
      throw new Error("Failed to sync stats with Twitter");
    }
  },
});
