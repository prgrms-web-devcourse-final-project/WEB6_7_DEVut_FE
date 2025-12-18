// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const ACCESS_TOKEN_SECRET = "access-secret";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const AUTH_REQUIRED_PATHS = ["/dashboard", "/posts", "/posts/create"];
// const GUEST_ONLY_PATHS = ["/login", "/signup"];

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const accessToken = getCookie(request, "access_token");
//   const refreshToken = getCookie(request, "refresh_token");

//   // 0) 게스트 전용 경로 처리 (/login, /signup)
//   if (isGuestOnlyPath(pathname)) {
//     const res = await handleGuestOnlyRoute(request, accessToken, refreshToken);
//     if (res) return res;
//     return NextResponse.next();
//   }

//   // 1) 인증 필요 없는 경로
//   if (!isAuthRequiredPath(pathname)) return NextResponse.next();

//   // 2) 인증 필요 경로: access 없으면 refresh 시도
//   if (!accessToken) {
//     if (!refreshToken) return redirectToLogin(request);
//     return refreshAccessAndContinueOrLogout(request, refreshToken);
//   }

//   // 3) access 검증
//   const accessState = verifyAccessToken(accessToken);

//   if (accessState === "valid") return NextResponse.next();

//   if (accessState === "expired") {
//     if (!refreshToken) return redirectToLogin(request);
//     return refreshAccessAndContinueOrLogout(request, refreshToken);
//   }

//   return redirectToLogin(request);
// }

// /* -------------------------------------------------------------------------- */
// /* Guest-only                                                                  */
// /* -------------------------------------------------------------------------- */

// async function handleGuestOnlyRoute(
//   request: NextRequest,
//   accessToken: string | null,
//   refreshToken: string | null
// ): Promise<NextResponse | null> {
//   // access가 유효하면 이미 로그인 상태 → 대시보드로 이동
//   if (accessToken && verifyAccessToken(accessToken) === "valid") {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // access가 없거나 만료/invalid인데 refresh가 있으면,
//   // refresh가 "살아있으면" 새 access 받아서 로그인 상태로 보고 대시보드로 이동,
//   // refresh가 "죽었으면" 쿠키 정리하고 /login 접근 허용
//   if (refreshToken) {
//     const newAccess = await requestNewAccessToken(refreshToken);

//     if (newAccess) {
//       const res = NextResponse.redirect(new URL("/dashboard", request.url));
//       setAccessCookie(res, newAccess);
//       return res;
//     }

//     // refresh도 만료/invalid → 쿠키 삭제하고 /login 그대로 보여주기
//     const res = NextResponse.next();
//     clearAuthCookies(res);
//     return res;
//   }

//   // 토큰 자체가 없으면 그냥 /login 접근 허용
//   return null;
// }

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                     */
// /* -------------------------------------------------------------------------- */

// function isAuthRequiredPath(pathname: string) {
//   return AUTH_REQUIRED_PATHS.some((p) => pathname.startsWith(p));
// }

// function isGuestOnlyPath(pathname: string) {
//   return GUEST_ONLY_PATHS.some((p) => pathname.startsWith(p));
// }

// function getCookie(request: NextRequest, name: string) {
//   return request.cookies.get(name)?.value ?? null;
// }

// function redirectToLogin(request: NextRequest) {
//   const res = NextResponse.redirect(new URL("/login", request.url));
//   clearAuthCookies(res);
//   return res;
// }

// function clearAuthCookies(res: NextResponse) {
//   res.cookies.set("access_token", "", { maxAge: 0, path: "/" });
//   res.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });
// }

// function setAccessCookie(res: NextResponse, token: string) {
//   res.cookies.set("access_token", token, {
//     httpOnly: true,
//     sameSite: "none",
//     path: "/",
//     secure: true, // HTTPS면 켜기
//   });
// }

// function verifyAccessToken(token: string): "valid" | "expired" | "invalid" {
//   try {
//     jwt.verify(token, ACCESS_TOKEN_SECRET);
//     return "valid";
//   } catch (err) {
//     if (err instanceof Error && err.name === "TokenExpiredError")
//       return "expired";
//     return "invalid";
//   }
// }

// async function refreshAccessAndContinueOrLogout(
//   request: NextRequest,
//   refreshToken: string
// ) {
//   const newAccessToken = await requestNewAccessToken(refreshToken);

//   if (!newAccessToken) return redirectToLogin(request);

//   const res = NextResponse.next();
//   setAccessCookie(res, newAccessToken);
//   return res;
// }

// async function requestNewAccessToken(
//   refreshToken: string
// ): Promise<string | null> {
//   if (!API_URL) return null;

//   try {
//     const res = await fetch(`${API_URL}/auth/refresh`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!res.ok) return null;

//     const data = (await res.json()) as {
//       accessToken?: string;
//       access_token?: string;
//     };
//     return data.accessToken ?? data.access_token ?? null;
//   } catch {
//     return null;
//   }
// }
