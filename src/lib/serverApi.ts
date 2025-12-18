import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export async function ServerApi(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Cookie: cookieHeader, // 브라우저 쿠키 그대로 전달
      "Content-Type": "application/json",
    },
    cache: "no-store", // 인증된 데이터는 보통 no-store
  });

  return res;
}
