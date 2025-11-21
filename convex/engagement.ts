"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { TwitterApi } from "twitter-api-v2";

export const fetchTweets = action({
  args: { userId: v.id("users"), count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getUserById, {
      userId: args.userId,
    });
    if (!user || !user.accessToken)
      throw new Error("User not found or not authenticated");

    const client = new TwitterApi(user.accessToken);
    const targets = await ctx.runQuery(api.targets.getTargets);

    for (const target of targets) {
      try {
        const userV2 = await client.v2.userByUsername(target.username);
        const tweets = await client.v2.userTimeline(userV2.data.id, {
          max_results: 5,
          exclude: ["retweets", "replies"],
        });

        for (const tweet of tweets.data.data) {
          // Generate reply
          const reply = await ctx.runAction(api.engagement.generateReply, {
            tweetId: tweet.id,
            tweetText: tweet.text,
          });

          await ctx.runMutation(internal.engagementDb.createReply, {
            userId: args.userId,
            targetTweetId: tweet.id,
            targetUsername: target.username,
            targetTweetText: tweet.text,
            generatedReply: reply,
            status: "pending",
          });
        }
      } catch (e) {
        console.error(`Failed to fetch for ${target.username}`, e);
      }
    }
  },
});

export const generateReply = action({
  args: { tweetId: v.string(), tweetText: v.string() },
  handler: async (ctx, args) => {
    // Mock AI for now
    return `This is a great insight! I've been thinking about this too. #indiehackers`;
  },
});
