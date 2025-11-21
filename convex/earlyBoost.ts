"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { TwitterApi } from "twitter-api-v2";

// Poll for new tweets from the authenticated user
export const pollMyTweets = action({
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
      // Get user's own tweets (last 5)
      const me = await client.v2.me();
      const tweets = await client.v2.userTimeline(me.data.id, {
        max_results: 5,
        exclude: ["retweets", "replies"],
        "tweet.fields": ["created_at"],
      });

      if (!tweets.data.data) return { newTweets: 0 };

      let newTweetCount = 0;

      for (const tweet of tweets.data.data) {
        // Check if we've already notified about this tweet
        const existing = await ctx.runQuery(
          api.earlyBoostDb.getTweetNotification,
          {
            tweetId: tweet.id,
          }
        );

        if (!existing) {
          // New tweet! Send Telegram notification
          await ctx.runAction(api.earlyBoost.notifyNewTweet, {
            tweetId: tweet.id,
            text: tweet.text,
            url: `https://twitter.com/${user.username}/status/${tweet.id}`,
          });

          // Mark as notified
          await ctx.runMutation(internal.earlyBoostDb.markAsNotified, {
            tweetId: tweet.id,
            userId: args.userId,
          });

          newTweetCount++;
        }
      }

      return { newTweets: newTweetCount };
    } catch (e: any) {
      console.error("Error polling tweets:", e);
      throw new Error(e.message || "Failed to poll tweets");
    }
  },
});

export const notifyNewTweet = action({
  args: {
    tweetId: v.string(),
    text: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log("Telegram credentials not set. Skipping notification.");
      return;
    }

    const message = `🔥 *New post live!*\n\nDrop a like/reply in first 5 mins for maximum reach!\n\n${args.text.substring(0, 100)}${args.text.length > 100 ? "..." : ""}\n\n🔗 ${args.url}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
            disable_web_page_preview: false,
          }),
        }
      );

      const data = await response.json();
      if (!data.ok) {
        throw new Error(data.description || "Telegram API error");
      }

      console.log("Telegram notification sent successfully!");
    } catch (e: any) {
      console.error("Telegram notification failed:", e);
      throw new Error(e.message || "Failed to send Telegram notification");
    }
  },
});
