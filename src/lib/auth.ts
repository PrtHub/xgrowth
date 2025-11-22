import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAuthSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const secret = new TextEncoder().encode(process.env.X_CLIENT_SECRET!);
    const { payload } = await jwtVerify(session, secret);
    return payload as { userId: string };
  } catch (error) {
    return null;
  }
}
