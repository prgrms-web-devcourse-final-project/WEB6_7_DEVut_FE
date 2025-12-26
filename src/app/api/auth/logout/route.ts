import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.shop" : undefined,
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.shop" : undefined,
  });

  return response;
}
