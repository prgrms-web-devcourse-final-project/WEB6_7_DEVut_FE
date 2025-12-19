// import { cookies } from "next/headers";

// const API_URL = process.env.API_URL ?? "http://localhost:4000";

// export async function ServerApi(path: string, init: RequestInit = {}) {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore
//     .getAll()
//     .map((c) => `${c.name}=${c.value}`)
//     .join("; ");

//   const res = await fetch(`${API_URL}${path}`, {
//     ...init,
//     headers: {
//       ...(init.headers || {}),
//       Cookie: cookieHeader, // 브라우저 쿠키 그대로 전달
//       "Content-Type": "application/json",
//     },
//     cache: "no-store", // 인증된 데이터는 보통 no-store
//   });

//   return res;
// }

import { cookies } from "next/headers";

type Params = Record<string, string | number | boolean | undefined>;

type ServerApiInit = RequestInit & {
  params?: Params;
};

export async function ServerApi<T>(
  path: string,
  init: ServerApiInit = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchInit } = init;

  const qs = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1${path}${qs}`, {
    ...fetchInit,
    headers: {
      "Content-Type": "application/json",
      ...(fetchInit.headers || {}),
      Cookie: cookieHeader,
    },
    cache: fetchInit.cache ?? "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  return (await res.json()) as ApiResponse<T>;
}
