import ClientApi from "@/lib/clientApi";

import type { UserSignupRequest, UserSignupResponse } from "../types/auth.types";

function isSuccess(resultCode: string) {
  return resultCode === "OK" || resultCode === "SUCCESS" || resultCode === "200";
}

function assertSuccess<T>(res: ApiResponse<T>) {
  if (!isSuccess(res.resultCode)) {
    throw new Error(res.msg || "요청에 실패했습니다.");
  }
  return res;
}

// 회원가입 (Client)
export async function signup(payload: UserSignupRequest): Promise<UserSignupResponse> {
  const res = await ClientApi<UserSignupResponse["data"]>("/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return assertSuccess(res) as UserSignupResponse;
}

// 내 정보 조회
export async function getMe(): Promise<User | null> {
  const res = await fetch("/api/auth/me", { method: "GET", credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(await res.text());

  const json = await res.json();
  return (json?.data ?? null) as User | null;
}


