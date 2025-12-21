import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProd = process.env.NODE_ENV === "production";

/**
 * 백엔드가 소셜 로그인 성공 후
 * http://localhost:3000/oauth2/success 로 redirect 해주는 상황.
 *
 * 여기서 할 일:
 * 1) (가능하면) 백엔드가 준 토큰을 프론트 도메인 쿠키로 "확정"
 *    - 케이스A: 백엔드가 query로 내려줌 (?accessToken=...&refreshToken=...)
 *    - 케이스B: 백엔드가 이미 cookie로 내려줌 (accessToken/refreshToken)
 * 2) 로그인 성공 처리 후 홈으로 redirect
 * 3) 실패면 /login 으로 redirect
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;

  // ✅ 케이스A: 토큰을 query로 주는 경우도 지원 (백엔드 구현에 따라 있을 수 있음)
  const accessFromQuery = url.searchParams.get("accessToken");
  const refreshFromQuery = url.searchParams.get("refreshToken");

  // ✅ 케이스B: 백엔드가 이미 쿠키로 심어준 경우 (localhost는 port 달라도 쿠키 공유 가능)
  const accessFromCookie = req.cookies.get("accessToken")?.value;
  const refreshFromCookie = req.cookies.get("refreshToken")?.value;

  const accessToken = accessFromQuery ?? accessFromCookie ?? "";
  const refreshToken = refreshFromQuery ?? refreshFromCookie ?? "";

  // ❌ 둘 다 없으면 로그인 실패로 보고 로그인페이지로
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login?reason=social_failed", req.url));
  }

  // ✅ 성공: 홈으로 보내면서 "프론트 도메인 쿠키"로 확정 세팅(쿼리로 왔을 때 특히 필요)
  const res = NextResponse.redirect(new URL("/", req.url));

  // accessToken이 있으면 심기
  if (accessToken) {
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd, // 로컬(http)에서는 false여야 쿠키가 저장됨
      sameSite: "lax",
      path: "/",
      // 백엔드 토큰 정책과 맞추기
      maxAge: 60 * 10,
    });
  }

  // refreshToken이 있으면 심기
  if (refreshToken) {
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      // 백엔드 토큰 정책과 맞추기
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}
