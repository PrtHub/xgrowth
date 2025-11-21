import { xClient } from "@/lib/x-api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { SignJWT } from "jose";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("state")?.value;
  const codeVerifier = cookieStore.get("code_verifier")?.value;

  if (
    !state ||
    !code ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    return NextResponse.json(
      { error: "Invalid state or code" },
      { status: 400 }
    );
  }

  try {
    const {
      client: loggedClient,
      accessToken,
      refreshToken,
      expiresIn,
    } = await xClient.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.X_REDIRECT_URI!,
    });

    const { data: me } = await loggedClient.v2.me({
      "user.fields": ["profile_image_url", "public_metrics"],
    });

    const userId = await convex.mutation(api.users.storeUser, {
      twitterId: me.id,
      name: me.name,
      username: me.username,
      accessToken,
      refreshToken: refreshToken || "",
      tokenExpiresAt: Date.now() + expiresIn * 1000,
    });

    // Store initial stats
    if (me.public_metrics) {
      // We need a mutation for this. I'll add it to users.ts or just use internal mutation if I had one.
      // For now, I'll assume storeUser handles it or I'll add a separate call if I update storeUser.
      // Actually, I should update storeUser to accept stats or create a new mutation.
      // Let's stick to the plan: add dailyStats table. I need a mutation to insert into it.
      // I'll add `updateStats` mutation to users.ts next.
    }

    // Create JWT session
    const secret = new TextEncoder().encode(process.env.X_CLIENT_SECRET!);
    const token = await new SignJWT({ userId: userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
