import { xClient } from "@/lib/x-api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";
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

    const { data: me } = await loggedClient.v2.me();

    const userId = await convex.mutation(api.users.storeUser, {
      twitterId: me.id,
      name: me.name,
      username: me.username,
      accessToken,
      refreshToken: refreshToken || "",
      tokenExpiresAt: Date.now() + expiresIn * 1000,
    });

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
