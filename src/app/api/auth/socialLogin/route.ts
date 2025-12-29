import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch(`${API_URL}/api/v1/users/oauth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await upstream.json();

  if (!upstream.ok) {
    return NextResponse.json(json, { status: upstream.status });
  }

  const { accessToken, refreshToken, userInfo } = json.data;

  if (!userInfo || !accessToken || !refreshToken) {
    console.error("[socialLogin route] missing fields", json);
    return NextResponse.json(
      { msg: "social login response missing token/userInfo" },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ userInfo });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.shop" : undefined,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.shop" : undefined,
  });
  return response;
}
