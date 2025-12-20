import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { ServerApi } from "./lib/serverApi";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_REQUIRED_PATHS = ["/", "/mypage", "/wallet", "/message"];
const GUEST_ONLY_PATHS = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  const accessToken = getCookie(request, "accessToken");
  const refreshToken = getCookie(request, "refreshToken");
  if (isGuestOnlyPath(pathname)) {
    const res = await handleGuestOnlyRoute(request, accessToken, refreshToken);
    if (res) return res;
    return NextResponse.next();
  }
  // 1) 인증 필요 없는 경로
  if (!isAuthRequiredPath(pathname)) return NextResponse.next();

  console.log("TOKENS:", {
    hasAccess: !!accessToken,
    hasRefresh: !!refreshToken,
  });
  // 2) 인증 필요 경로: access 없으면 refresh 시도
  if (!accessToken) {
    console.log("NO ACCESS -> refresh path");

    if (!refreshToken) return redirectToLogin(request);
    return refreshAccessAndContinueOrLogout(request);
  }
  // 3) access 검증
  const accessState = verifyAccessToken(accessToken);
  console.log("ACCESS STATE:", accessState);

  // if (accessState === "valid") {
  //   console.log("access valid");
  //   return NextResponse.next();
  // }
  // if (accessState === "expired") {
  //   console.log("refresh try", {
  //     hasRefresh: !!refreshToken,
  //     api: `${API_URL}/api/v1/users/refresh`,
  //   });
  //   if (!refreshToken) return redirectToLogin(request);
  //   return refreshAccessAndContinueOrLogout(request);
  // }
  // return redirectToLogin(request);

  if (accessState === "valid") return NextResponse.next();

  // expired/invalid 모두 refreshToken 있으면 재발급 시도
  if (!refreshToken) return redirectToLogin(request);
  return refreshAccessAndContinueOrLogout(request);
}
/* -------------------------------------------------------------------------- */
/* Guest-only                                                                  */
/* -------------------------------------------------------------------------- */
async function handleGuestOnlyRoute(
  request: NextRequest,
  accessToken: string | null,
  refreshToken: string | null
): Promise<NextResponse | null> {
  // access가 유효하면 이미 로그인 상태 → 메인으로 이동
  if (accessToken && verifyAccessToken(accessToken) === "valid") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // access가 없거나 만료/invalid인데 refresh가 있으면,
  // refresh가 "살아있으면" 새 access 받아서 로그인 상태로 보고 메인으로 이동,
  // refresh가 "죽었으면" 쿠키 정리하고 /login 접근 허용
  if (refreshToken) {
    const newAccess = await requestNewAccessToken(request);
    if (newAccess) {
      const res = NextResponse.redirect(new URL("/", request.url));
      setAccessCookie(res, newAccess);
      return res;
    }
    // refresh도 만료/invalid → 쿠키 삭제하고 /login 접근 허용
    const res = NextResponse.next();
    clearAuthCookies(res);
    return res;
  }
  // 토큰 자체가 없으면 그냥 /login 접근 허용
  return null;
}
/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */
function isAuthRequiredPath(pathname: string) {
  // '/'는 startsWith면 모든 경로가 매칭되기 때문에 특별취급
  if (pathname === "/") return true;
  return AUTH_REQUIRED_PATHS.filter(p => p !== "/").some(p => pathname.startsWith(p));
}
function isGuestOnlyPath(pathname: string) {
  return GUEST_ONLY_PATHS.some(p => pathname.startsWith(p));
}
function getCookie(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value ?? null;
}
function redirectToLogin(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  clearAuthCookies(res);
  return res;
}
function clearAuthCookies(res: NextResponse) {
  res.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
  res.cookies.set("refreshToken", "", { maxAge: 0, path: "/" });
}
function setAccessCookie(res: NextResponse, token: string) {
  res.cookies.set("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production", // HTTPS면 켜기
    maxAge: 60 * 10,
  });
}
function verifyAccessToken(token: string): "valid" | "expired" | "invalid" {
  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    return "valid";
  } catch (err) {
    if (err instanceof Error && err.name === "TokenExpiredError") return "expired";
    return "invalid";
  }
}
async function refreshAccessAndContinueOrLogout(request: NextRequest) {
  const newAccessToken = await requestNewAccessToken(request);
  if (!newAccessToken) return redirectToLogin(request);
  const res = NextResponse.next();
  setAccessCookie(res, newAccessToken);
  return res;
}
async function requestNewAccessToken(request: NextRequest): Promise<string | null> {
  if (!API_URL) return null;

  const cookieHeader = request.cookies
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const res = await fetch(`${API_URL}/api/v1/users/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Cookie: `refreshToken=${getCookie(request, "refreshToken")}`,
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.log("REFRESH FAIL", res.status, text);
      return null;
    }

    const json = await res.json();
    console.log("REFRESH OK", json);

    return json.data?.accessToken ?? null;
  } catch (e) {
    console.error("refresh failed", e);
    return null;
  }
}
// async function requestNewAccessToken(refreshToken: string): Promise<string | null> {
//   if (!API_URL) return null;
//   try {
//     const res = await fetch(`${API_URL}/api/v1/users/refresh`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Cookie: `refreshToken=${refreshToken}` },
//       // body: JSON.stringify({ refreshToken }),
//       cache: "no-store",
//     });
//     if (!res.ok) return null;
//     const json = await res.json();
//     const accessToken = json.data.accessToken;
//     console.log("refresh status", res.status);
//     console.log("refresh body", await res.clone().text());
//     return accessToken ?? null;
//   } catch {
//     return null;
//   }
// }
