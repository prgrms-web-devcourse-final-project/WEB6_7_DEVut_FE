export async function login(payload: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include", // 쿠키 받기 필수
  });

  const json = await res.json();

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "로그인 실패");
  }

  return json;
}
