"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { TwitterApi } from "twitter-api-v2";

export const post = action({
  args: {
    replyId: v.id("replies"),
    userId: v.id("users"),
    replyText: v.string(),
    targetTweetId: v.string(),
  },
  handler: async (
    ctx,
    args
  ): Promise<{ success: boolean; tweetId: string }> => {
    const user = await ctx.runQuery(api.users.getUserById, {
      userId: args.userId,
    });

    if (!user || !user.accessToken) {
      throw new Error("User not authenticated with X.");
    }

    const client: TwitterApi = new TwitterApi(user.accessToken);

    try {
      const response = await client.v2.reply(
        args.replyText,
        args.targetTweetId
      );

      if (response.data.id) {
        // Mark as posted in database
        await ctx.runMutation(internal.engagementDb.markAsPosted, {
          replyId: args.replyId,
          postedTweetId: response.data.id,
        });
        return { success: true, tweetId: response.data.id };
      } else {
        throw new Error("Failed to post reply (No ID returned).");
      }
    } catch (e: any) {
      console.error("X API Error:", e);
      throw new Error(e.message || "Failed to post reply.");
    }
  },
});
