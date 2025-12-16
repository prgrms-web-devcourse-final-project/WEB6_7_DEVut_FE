import { apiClient } from "@/shared/api/client";
import type { UserSigninRequest, UserSigninResponse } from "../types/auth.types";

export async function signin(payload: UserSigninRequest) {
  const res = await apiClient.post<UserSigninResponse>("/api/v1/users/signin", payload);

  console.log("[signin] status:", res.status);
  console.log("[signin] data:", res.data);
  console.log("[signin] headers:", res.headers);

  return res.data;
}
