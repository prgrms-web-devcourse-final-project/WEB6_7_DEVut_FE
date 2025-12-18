import { apiClient } from "@/shared/api/client";
import type { UserSigninRequest, UserSigninResponse } from "../types/auth.types";

export async function signin(payload: UserSigninRequest) {
  const res = await apiClient.post<UserSigninResponse>("/api/v1/users/signin", payload);
  return res.data;
}

export async function signout() {
  const res = await apiClient.post("/api/v1/users/signout");
  return res.data;
}

export async function getMe() {
  const res = await apiClient.get("/api/v1/users/me");
  return res.data;
}

export async function refreshToken() {
  const res = await apiClient.get("/api/v1/users/refresh");
  return res.data;
}

export async function updateMe(payload: {
  email: string;
  nickname: string | null;
  birthDate: string;
  image: string | null;
}) {
  const res = await apiClient.patch<ApiResponse<User>>("/api/v1/users/me", payload);
  return res.data;
}
