"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { TwitterApi } from "twitter-api-v2";
import { TARGET_ACCOUNTS } from "./targets";

export const getFreshPosts = action({
  args: { userId: v.id("users") },
  handler: async (
    ctx,
    args
  ): Promise<{ status: string; processed: number }> => {
    const user = await ctx.runQuery(api.users.getUserById, {
      userId: args.userId,
    });
    if (!user || !user.accessToken)
      throw new Error("User not found or not authenticated");

    const client: TwitterApi = new TwitterApi(user.accessToken);
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

    let processedCount = 0;

    // Shuffle targets to avoid hitting same people every time if we limit
    const shuffledTargets = [...TARGET_ACCOUNTS].sort(
      () => 0.5 - Math.random()
    );

    // Limit to first 20 targets per run to avoid rate limits
    const batch = shuffledTargets.slice(0, 20);

    for (const username of batch) {
      try {
        // 1. Get User ID
        const userV2 = await client.v2.userByUsername(username);
        if (!userV2.data) continue;

        // 2. Get Timeline
        const tweets = await client.v2.userTimeline(userV2.data.id, {
          max_results: 5,
          exclude: ["retweets", "replies"],
          start_time: sixHoursAgo,
          "tweet.fields": ["created_at", "public_metrics"],
        });

        if (!tweets.data.data) continue;

        for (const tweet of tweets.data.data) {
          // Generate Reply
          const reply: string = await ctx.runAction(
            api.generateReply.generate,
            {
              tweetText: tweet.text,
              authorUsername: username,
            }
          );

          // Store reply
          await ctx.runMutation(internal.engagementDb.createReply, {
            userId: args.userId,
            targetTweetId: tweet.id,
            targetUsername: username,
            targetTweetText: tweet.text,
            generatedReply: reply,
            status: "pending",
          });

          processedCount++;
        }

        // Rate limit safety: Sleep 1 second between users
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e: any) {
        console.error(`Failed to fetch for ${username}`, e);
        if (e.code === 429) {
          console.log("Rate limit hit, stopping batch.");
          break;
        }
      }
    }

    return { status: "success", processed: processedCount };
  },
});
