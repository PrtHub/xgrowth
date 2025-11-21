"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

export const generate = action({
  args: {
    tweetText: v.string(),
    authorUsername: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log("OpenAI API Key not found, returning mock reply.");
      return "This is a mock reply. Set OPENAI_API_KEY to get real AI responses! 🚀";
    }

    const prompt = `
You are Pritam (@iPritamX), a SaaS builder, developer, and creator of Artifact UI. 
You are an Indian indie hacker building in public.
Your tone is casual, friendly, helpful, and authentic. You use emojis naturally (🚀, ⚡, 💯, 🤝) but not like a bot.

Context:
You are replying to a tweet by @${args.authorUsername}.
Tweet Content: "${args.tweetText}"

Instructions:
1. Write a reply that adds value (a code tip, a thoughtful question, or a shared struggle).
2. Be specific to their tweet. Do NOT be generic (e.g., avoid "Great post!", "Thanks for sharing!").
3. If the tweet is about UI, Design, or Tailwind, you can subtly mention your experience with Artifact UI, but only if it feels natural.
4. Keep it under 280 characters.
5. Use casual capitalization (mostly lowercase is fine) but clear grammar.
6. Sound like a peer/friend, not a customer support agent.

Example Replies:
- "man this is exactly what i struggled with last week. switching to convex fixed it for me ⚡"
- "love the glassmorphism vibe here. have you tried adding a subtle noise texture? makes it pop 💯"
- "shipping is the only way to learn. congrats on the launch! 🚀 what's the tech stack?"

Generate the reply text only.
    `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o", // or gpt-3.5-turbo
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant mimicking a specific Twitter persona.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();
      const reply = data.choices[0]?.message?.content?.trim();
      return reply || "Error generating reply.";
    } catch (e) {
      console.error("OpenAI Error:", e);
      return "Error generating reply (Check logs).";
    }
  },
});
