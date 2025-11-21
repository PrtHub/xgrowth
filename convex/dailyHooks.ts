"use node";

import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const generate = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log("OpenAI API Key not found, returning mock hooks.");
      return [
        "🚀 Shipped Artifact UI in 48 hours. 0 lines of backend code. Just Convex + Next.js 15. This is the future.",
        "Most devs spend weeks on auth. I spent 2 hours with Convex Auth. Shipped the whole MVP in a weekend. Time is money.",
        "Hot take: If your SaaS doesn't have glassmorphism in 2025, you're leaving money on the table. UI = Trust = Revenue.",
      ];
    }

    const prompt = `
You are Pritam (@iPritamX), creator of Artifact UI, a SaaS builder, and Indian indie hacker.

Generate 3 VIRAL X (Twitter) hooks/threads about:
- Artifact UI (your design system product)
- Building in public
- SaaS growth
- Indie hacking
- Next.js / React / Modern web dev

RULES FOR VIRAL HOOKS:
1. **Hot Takes**: Controversial but defensible opinions
2. **Numbers**: Revenue, followers, time saved, before/after metrics
3. **Curiosity Gap**: Make people NEED to read more
4. **Emotion**: Struggle → Success, Fear → Confidence
5. **Specificity**: "48 hours" not "quickly", "$5k MRR" not "some money"
6. **Formats that work**:
   - "I did X. Here's what happened..."
   - "Most people do X. I did Y. Results..."
   - "X months ago I had Y. Today I have Z. Here's how..."
   - "Hot take: [controversial statement]"
   - "Why [common belief] is wrong..."

EXAMPLES OF VIRAL HOOKS:
- "Built a $10k/mo SaaS in 30 days. 0 backend code. Here's the stack 🧵"
- "Most designers use Figma for 6 hours. I use it for 6 minutes. Here's my secret..."
- "Artifact UI hit $5k MRR. I'm giving away the entire playbook. Free. 🧵"
- "Hot take: Tailwind is holding you back. Here's why..."
- "I spent $0 on ads. Got 10k users in 2 weeks. Here's the growth loop..."

YOUR CONTEXT:
- You built Artifact UI (a premium component library)
- You're building in public on X
- You use Next.js 15, Convex, Tailwind, TypeScript
- You care about aesthetics, speed, and indie hacking
- You're from India, building global products

Generate 3 hooks. Each should be:
- 1-2 sentences max
- Under 280 characters
- Extremely clickable
- Mix of formats (hot take, numbers, story)
- Natural emoji usage (🚀, 💰, ⚡, 🧵)

Return ONLY the 3 hooks as a JSON array of strings.
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
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: "You are a viral content expert for X (Twitter).",
              },
              { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
            max_tokens: 300,
          }),
        }
      );

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      const parsed = JSON.parse(content || "{}");
      const hooks = parsed.hooks || Object.values(parsed)[0] || [];

      // Store in DB
      for (const hook of hooks) {
        await ctx.runMutation(internal.hooks.createHook, {
          userId: "system" as any,
          content: hook,
          type: "hook",
        });
      }

      return hooks;
    } catch (e) {
      console.error("OpenAI Error:", e);
      // Fallback hooks
      const fallbackHooks = [
        "🚀 Shipped Artifact UI in 48 hours. 0 lines of backend code. Just Convex + Next.js 15. This is the future.",
        "Most devs spend weeks on auth. I spent 2 hours with Convex Auth. Shipped the whole MVP in a weekend. Time is money.",
        "Hot take: If your SaaS doesn't have glassmorphism in 2025, you're leaving money on the table. UI = Trust = Revenue.",
      ];

      for (const hook of fallbackHooks) {
        await ctx.runMutation(internal.hooks.createHook, {
          userId: "system" as any,
          content: hook,
          type: "hook",
        });
      }

      return fallbackHooks;
    }
  },
});
