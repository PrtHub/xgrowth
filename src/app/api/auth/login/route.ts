import { xClient } from "@/lib/x-api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const { url, codeVerifier, state } = xClient.generateOAuth2AuthLink(
    process.env.X_REDIRECT_URI!,
    {
      scope: [
        "tweet.read",
        "tweet.write",
        "users.read",
        "offline.access",
        "like.write",
      ],
    }
  );

  const cookieStore = await cookies();
  cookieStore.set("code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
  });
  cookieStore.set("state", state, { httpOnly: true, secure: true });

  return NextResponse.redirect(url);
}
