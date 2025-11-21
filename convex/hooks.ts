import { v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";

export const generateHooks = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Call AI to generate hooks
    const prompt = `Generate 3 viral Twitter hooks/threads for an indie hacker building in public. Focus on SaaS, growth, and coding.`;

    // Mock response
    const hooks = [
      "I built a SaaS in 48 hours. Here's exactly how I did it (tech stack inside) 🧵",
      "Stop overthinking your MVP. Ship it. Fix it later. Here's why:",
      "The biggest mistake indie hackers make is building without an audience. Here's how to fix that:",
    ];

    for (const hook of hooks) {
      await ctx.runMutation(internal.hooks.createHook, {
        userId: args.userId,
        content: hook,
        type: "hook",
      });
    }
  },
});

export const createHook = internalMutation({
  args: {
    userId: v.id("users"),
    content: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("hooks", {
      userId: args.userId,
      content: args.content,
      type: args.type,
      isUsed: false,
      generatedAt: Date.now(),
    });
  },
});

export const getHooks = query({
  handler: async (ctx) => {
    return await ctx.db.query("hooks").order("desc").collect();
  },
});
