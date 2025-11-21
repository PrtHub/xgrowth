import { TwitterApi } from "twitter-api-v2";

export const xClient = new TwitterApi({
  clientId: process.env.X_CLIENT_ID!,
  clientSecret: process.env.X_CLIENT_SECRET!,
});

export const getXClient = (accessToken: string) => {
  return new TwitterApi(accessToken);
};
