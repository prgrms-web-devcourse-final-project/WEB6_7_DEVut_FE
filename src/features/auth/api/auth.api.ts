import ClientApi from "@/lib/clientApi";
import type {
  UserRefreshResponse,
  UserSigninRequest,
  UserSigninResponse,
  UserSignupRequest,
  UserSignupResponse,
} from "../types/auth.types";

type ApiErrorBody = { msg?: string; resultCode?: string };

async function parseError(res: Response) {
  try {
    const data = (await res.json()) as ApiErrorBody;
    return data?.msg ?? `HTTP ${res.status}`;
  } catch {
    const text = await res.text().catch(() => "");
    return text || `HTTP ${res.status}`;
  }
}

export async function signin(payload: UserSigninRequest): Promise<UserSigninResponse> {
  const res = await ClientApi("/api/v1/users/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as UserSigninResponse;
}

// export async function updateMe(payload: {
//   email: string;
//   nickname: string | null;
//   birthDate: string;
//   image: string | null;
// }) {
//   const res = await apiClient.patch<ApiResponse<User>>("/api/v1/users/me", payload);
//   return res.data;
// }
export async function signup(payload: UserSignupRequest): Promise<UserSignupResponse> {
  const res = await ClientApi("/api/v1/users/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as UserSignupResponse;
}

export async function signout(): Promise<unknown> {
  const res = await ClientApi("/api/v1/users/signout", { method: "POST" });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function getMe(): Promise<User | null> {
  const res = await ClientApi("/api/v1/users/me", { method: "GET" });

  if (res.status === 401) return null; // 비로그인 = 정상 케이스
  if (!res.ok) throw new Error(await parseError(res));

  return (await res.json()) as User;
}

export async function refreshToken(): Promise<UserRefreshResponse> {
  const res = await ClientApi("/api/v1/users/refresh", { method: "POST" });

  if (!res.ok) throw new Error(await parseError(res));
  return (await res.json()) as UserRefreshResponse;
}
