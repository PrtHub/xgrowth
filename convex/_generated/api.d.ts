/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as boost from "../boost.js";
import type * as crons from "../crons.js";
import type * as dailyHooks from "../dailyHooks.js";
import type * as earlyBoost from "../earlyBoost.js";
import type * as earlyBoostDb from "../earlyBoostDb.js";
import type * as engagement from "../engagement.js";
import type * as engagementDb from "../engagementDb.js";
import type * as generateReply from "../generateReply.js";
import type * as getFreshPosts from "../getFreshPosts.js";
import type * as hooks from "../hooks.js";
import type * as postReply from "../postReply.js";
import type * as stats from "../stats.js";
import type * as targets from "../targets.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  boost: typeof boost;
  crons: typeof crons;
  dailyHooks: typeof dailyHooks;
  earlyBoost: typeof earlyBoost;
  earlyBoostDb: typeof earlyBoostDb;
  engagement: typeof engagement;
  engagementDb: typeof engagementDb;
  generateReply: typeof generateReply;
  getFreshPosts: typeof getFreshPosts;
  hooks: typeof hooks;
  postReply: typeof postReply;
  stats: typeof stats;
  targets: typeof targets;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
