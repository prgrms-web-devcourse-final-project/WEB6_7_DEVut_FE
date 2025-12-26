import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type LoginRedirectReason =
  | "auth_required" // 비로그인 상태에서 보호 페이지 접근
  | "session_expired" // access 만료 + refresh 성공
  | "refresh_failed"; // refresh 토큰도 만료/무효

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AUTH_REQUIRED_PATHS = ["/message", "/mypage", "/notify", "/trade", "/write"];
const GUEST_ONLY_PATHS = ["/login", "/signup"];

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/.well-known" ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  const accessToken = getCookie(request, "accessToken");
  const refreshToken = getCookie(request, "refreshToken");
  // console.log("PATH:", pathname);
  // console.log("TOKENS:", { hasAccess: !!accessToken, hasRefresh: !!refreshToken });
  // console.log("AUTH_REQUIRED:", isAuthRequiredPath(pathname));
  // console.log("GUEST_ONLY:", isGuestOnlyPath(pathname));
  if (isGuestOnlyPath(pathname)) {
    const res = await handleGuestOnlyRoute(request, accessToken, refreshToken);
    if (res) return res;
    return NextResponse.next();
  }
  // 1) 인증 필요 없는 경로
  if (!isAuthRequiredPath(pathname)) return NextResponse.next();

  // 2) 인증 필요 경로: access 없으면 refresh 시도
  if (!accessToken) {
    if (!refreshToken) return redirectToLogin(request, "auth_required");
    return refreshAccessAndContinueOrLogout(request, "session_expired");
  }
  // 3) access 검증
  const accessState = verifyAccessToken(accessToken);

  if (accessState === "valid") return NextResponse.next();

  // expired/invalid 모두 refreshToken 있으면 재발급 시도
  if (!refreshToken) return redirectToLogin(request, "refresh_failed");
  return refreshAccessAndContinueOrLogout(
    request,
    accessState === "expired" ? "session_expired" : "refresh_failed"
  );
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
    const newTokens = await requestNewAccessToken(request);
    if (newTokens) {
      const res = NextResponse.redirect(new URL("/", request.url));
      setAccessCookie(res, newTokens.accessToken);
      setRefreshCookie(res, newTokens.refreshToken);
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
// function isAuthRequiredPath(pathname: string) {
//   return AUTH_REQUIRED_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
// }
function norm(p: string) {
  if (p === "/") return "/";
  return p.endsWith("/") ? p.slice(0, -1) : p;
}

function isAuthRequiredPath(pathname: string) {
  const pn = norm(pathname);

  const hit = AUTH_REQUIRED_PATHS.some(p => {
    const pp = norm(p);
    const ok = pn === pp || pn.startsWith(pp + "/");
    // console.log("[MATCH?]", { pn, pp, ok });
    return ok;
  });

  return hit;
}
function isGuestOnlyPath(pathname: string) {
  return GUEST_ONLY_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
}
function getCookie(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value ?? null;
}
function redirectToLogin(request: NextRequest, reason = "auth_required") {
  const url = new URL("/login", request.url);
  url.searchParams.set("reason", reason);

  const res = NextResponse.redirect(url);
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

function setRefreshCookie(res: NextResponse, token: string) {
  res.cookies.set("refreshToken", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: REFRESH_TOKEN_MAX_AGE,
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
async function refreshAccessAndContinueOrLogout(
  request: NextRequest,
  reasonOnFail: LoginRedirectReason
) {
  const newTokens = await requestNewAccessToken(request);
  if (!newTokens) return redirectToLogin(request, reasonOnFail);
  const res = NextResponse.next();
  setAccessCookie(res, newTokens.accessToken);
  setRefreshCookie(res, newTokens.refreshToken);
  return res;
}
async function requestNewAccessToken(
  request: NextRequest
): Promise<{ accessToken: string; refreshToken: string } | null> {
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

    const accessToken = json.data?.accessToken;
    const refreshToken = json.data?.refreshToken;

    if (!accessToken || !refreshToken) return null;

    return { accessToken, refreshToken };
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
