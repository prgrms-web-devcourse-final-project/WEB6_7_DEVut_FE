import { refreshToken } from "@/features/auth/api/auth.api";
import { UserRefreshResponse } from "@/features/auth/types/auth.types";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { is } from "date-fns/locale";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshPromise: Promise<UserRefreshResponse> | null = null;

// refresh 중에 들어온 요청들 큐에 쌓아두기.... refresh 끝나면 다시 실행
type Pending = {
  resolve: () => void; // refresh 성공했을 때
  reject: (err: unknown) => void; // refresh 실패했을 때, 너도 실패 처리
};
let pendingQueue: Pending[] = [];

//

// refresh 끝나면 큐에 있는 모든 요청을 실행
function flushQueue(error?: unknown) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingQueue = [];
}

const REFRESH_PATH = "/api/v1/users/refresh"; // refresh 요청은 401처리에서 예외시켜야 하니까. 안그럼 무한루프 돈다.

apiClient.interceptors.response.use(
  response => response, // 성공이면 걍 통과
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined; // 싪패한 요청의 설정을 담아놓음. 다시 실행할거니까

    // 응답 자체가 없으면(네트워크 문제 등) 여기서 끝
    if (!originalRequest) return Promise.reject(error);

    // 401 아니면 그대로 던짐
    if (status !== 401) return Promise.reject(error);

    // refresh 요청에서 401이 나면 복구불가. 로그아웃 처리 대상
    if (originalRequest.url?.includes(REFRESH_PATH)) {
      return Promise.reject(error);
    }

    // 이미 재시도한 요청이면 무한루프 방지
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // ============================
    // 이미 refresh 중이면 기다리기
    if (isRefreshing) {
      try {
        await new Promise<void>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        });
        return apiClient(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    // refresh >>>>
    isRefreshing = true;
    refreshPromise = refreshToken();

    try {
      await refreshPromise;
      // refresh 성공 : 대기중인 요청들 풀기
      flushQueue();
      return apiClient(originalRequest);
    } catch (refreshErr) {
      // refresh 실패 : 대기중인 요청들 전부 실패 처리
      flushQueue(refreshErr);
      // 로그아웃 트리거 넣어야댐
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  }
);
