import { UserSigninResponse } from "@/features/auth/types/auth.types";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch(`${API_URL}/api/v1/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = (await upstream.json()) as UserSigninResponse;

  // 백엔드 실패면 그대로 전달
  if (!upstream.ok) {
    return NextResponse.json(json, { status: upstream.status });
  }

  const userInfo = json.data.userInfo;
  const accessToken = json.data.accessToken;
  const refreshToken = json.data.refreshToken;

  // 여기서 하나라도 없으면 "무조건" 로직/명세 불일치
  if (!userInfo || !accessToken || !refreshToken) {
    console.log("[login route] missing fields", json);
    return NextResponse.json({ msg: "signin response missing token/userInfo" }, { status: 500 });
  }

  // 프론트에서 nickname 쓰려면 userInfo는 응답으로 내려주는 게 편함
  const response = NextResponse.json({ userInfo });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.site" : undefined,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 15,
    domain: process.env.NODE_ENV === "production" ? ".buzzerbidder.site" : undefined,
  });

  return response;
}
