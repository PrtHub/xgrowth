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
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return `This is a great insight! I've been thinking about this too. #indiehackers (Mock: Set OPENROUTER_API_KEY)`;
    }

    const prompt = `
You are Pritam (@iPritamX), creator of Artifact UI.
You are replying to a tweet on X (Twitter).

TWEET CONTEXT:
"${args.tweetText}"

YOUR PERSONA:
- You built Artifact UI (premium design system)
- You love glassmorphism, clean UI, and shipping fast
- You are supportive of other indie hackers
- You use emojis naturally (🚀, 💯, 🔥) but don't overdo it
- You are casual, friendly, and concise (under 280 chars)
- You often mention "shipping", "design", or "building" if relevant

INSTRUCTIONS:
- Write a reply that adds value or encourages the original poster.
- Do NOT sound like a bot. Be human.
- If the tweet is about design/UI, mention how important aesthetics are.
- If the tweet is about shipping/speed, agree and hype them up.
- Keep it under 200 characters.
- No hashtags unless really relevant.

Generate ONLY the reply text.
    `;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://x-growth.vercel.app",
            "X-Title": "X Growth",
          },
          body: JSON.stringify({
            model: "x-ai/grok-2-1212",
            messages: [
              {
                role: "system",
                content: "You are a helpful, cool indie hacker on Twitter.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || "Awesome post! 🚀";
    } catch (e) {
      console.error("OpenAI Error:", e);
      return "Love this! Keep shipping 🚀";
    }
  },
});
