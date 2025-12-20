// import { apiClient } from "@/shared/api/client";
import {
  IssueEmailCodeRequest,
  IssueEmailCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
} from "../types/emailVerification.types";

// 이메일 인증번호 발급
export async function issueEmailCode(payload: IssueEmailCodeRequest) {
  const res = await apiClient.post<IssueEmailCodeResponse>(
    "/api/v1/users/email/verification",
    payload
  );
  return res.data;
}

// 인증번호 확인
export async function verifyEmailCode(payload: VerifyEmailCodeRequest) {
  const res = await apiClient.post<VerifyEmailCodeResponse>(
    "/api/v1/users/email/verification/verify",
    payload
  );
  return res.data;
}
