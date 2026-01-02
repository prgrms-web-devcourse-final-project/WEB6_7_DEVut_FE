import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const accessTokenCookie = cookieStore.get("accessToken");
  const refreshTokenCookie = cookieStore.get("refreshToken");

  const accessToken = accessTokenCookie?.value ?? null;
  const refreshToken = refreshTokenCookie?.value ?? null;

  return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
}
