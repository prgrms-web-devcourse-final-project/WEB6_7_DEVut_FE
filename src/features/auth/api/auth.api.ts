import { apiClient } from "@/shared/api/client";
import type {
  UserRefreshResponse,
  UserSigninRequest,
  UserSigninResponse,
  UserSignupRequest,
  UserSignupResponse,
} from "../types/auth.types";
import axios from "axios";

export async function signin(payload: UserSigninRequest) {
  const res = await apiClient.post<UserSigninResponse>("/api/v1/users/signin", payload);
  return res.data;
}

export async function signup(payload: UserSignupRequest) {
  const res = await apiClient.post<UserSignupResponse>("/api/v1/users/signup", payload);
  return res.data;
}

export async function signout() {
  const res = await apiClient.post("/api/v1/users/signout");
  return res.data;
}

export async function getMe() {
  try {
    const res = await apiClient.get<ApiResponse<User>>("/api/v1/users/me");
    return res.data.data;
  } catch (e) {
    // 401은 비로그인이므로 에러가 아니라 null로 처리
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      return null;
    }
    throw e; // 나머지 에러만 진짜 에러로
  }
}

export async function refreshToken() {
  const res = await apiClient.post<UserRefreshResponse>("/api/v1/users/refresh");
  return res.data;
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
