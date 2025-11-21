import { v } from "convex/values";
import { action } from "./_generated/server";

export const notifyNewTweet = action({
  args: { tweetId: v.string(), text: v.string(), url: v.string() },
  handler: async (ctx, args) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log("Telegram not configured");
      return;
    }

    const message = `🚀 **New Tweet Posted!**\n\n${args.text}\n\nBoost here: ${args.url}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
    } catch (e) {
      console.error("Failed to send Telegram notification", e);
    }
  },
});
