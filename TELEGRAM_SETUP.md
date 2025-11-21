# Telegram Early Boost Setup Guide

This guide will help you set up Telegram notifications for your new tweets.

## Prerequisites

- A Telegram account
- Your X Growth app running with Convex

## Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the prompts:
   - Choose a name (e.g., "X Growth Bot")
   - Choose a username (e.g., "your_xgrowth_bot")
4. **Copy the bot token** (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Get Your Chat ID

1. Search for your bot in Telegram (the username you just created)
2. Send any message to your bot (e.g., "Hello")
3. Open this URL in your browser (replace `YOUR_BOT_TOKEN`):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for `"chat":{"id":123456789}` in the response
5. **Copy the chat ID** (the number after `"id":`)

## Step 3: Add Environment Variables

Add these to your Convex environment variables:

### In Convex Dashboard:

1. Go to https://dashboard.convex.dev
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `TELEGRAM_BOT_TOKEN` = `your_bot_token_from_step_1`
   - `TELEGRAM_CHAT_ID` = `your_chat_id_from_step_2`

### Or via CLI:

```bash
npx convex env set TELEGRAM_BOT_TOKEN "your_bot_token"
npx convex env set TELEGRAM_CHAT_ID "your_chat_id"
```

## Step 4: How It Works

The system polls your X account every **5 minutes** for new tweets:

1. **New Tweet Detected** → Sends Telegram message
2. **Message Format**:

   ```
   🔥 New post live!

   Drop a like/reply in first 5 mins for maximum reach!

   [Tweet preview...]

   🔗 https://twitter.com/your_username/status/123...
   ```

## Step 5: Testing

### Manual Test (Optional):

You can manually trigger a notification by calling the action in Convex dashboard:

1. Go to **Functions** → `earlyBoost` → `notifyNewTweet`
2. Test with:
   ```json
   {
     "tweetId": "test123",
     "text": "This is a test tweet!",
     "url": "https://twitter.com/iPritamX/status/123"
   }
   ```

### Live Test:

1. Post a new tweet on X
2. Wait up to 5 minutes
3. Check your Telegram for the notification!

## Troubleshooting

### Not receiving notifications?

- ✅ Check bot token and chat ID are correct
- ✅ Ensure you sent a message to your bot first
- ✅ Check Convex logs for errors
- ✅ Verify the cron job is running (check Convex dashboard)

### Getting duplicate notifications?

- The system tracks notified tweets in the `tweetNotifications` table
- Each tweet is only notified once

## Advanced: Customize the Message

Edit `convex/earlyBoost.ts` → `notifyNewTweet` function:

```typescript
const message = `🔥 *New post live!*\n\n...`;
```

Change the emoji, text, or format as you like!

## Notes

- **Polling Interval**: Currently set to 5 minutes. You can change this in `convex/crons.ts`
- **Rate Limits**: X API allows checking your timeline frequently, but be mindful
- **Privacy**: Only you receive these notifications (private bot)
