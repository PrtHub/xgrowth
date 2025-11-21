import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// Schedule engagement fetch every 4 hours
crons.interval(
  "fetch-tweets",
  { hours: 4 },
  api.engagement.fetchTweets,
  { userId: "me" as any } // Need to resolve "me" or use a specific user ID
);

// Schedule hook generation every morning at 8 AM IST (2:30 AM UTC)
crons.daily(
  "generate-daily-hooks",
  { hourUTC: 2, minuteUTC: 30 },
  api.dailyHooks.generate
);

// Poll for new tweets every 5 minutes for early boost notifications
crons.interval(
  "poll-my-tweets",
  { minutes: 5 },
  api.earlyBoost.pollMyTweets,
  { userId: "me" as any } // Need to resolve to actual user ID
);

export default crons;
