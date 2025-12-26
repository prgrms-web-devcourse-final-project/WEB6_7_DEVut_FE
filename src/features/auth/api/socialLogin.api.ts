export async function socialLogin(tempToken: string) {
  const res = await fetch("/api/auth/socialLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tempToken }),
    credentials: "include",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "로그인 실패");
  }
  return res.json();
}
