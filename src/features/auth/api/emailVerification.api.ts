import ClientApi from "@/lib/clientApi";
import {
  IssueEmailCodeRequest,
  IssueEmailCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
} from "../types/emailVerification.types";

// 이메일 인증번호 발급
export async function issueEmailCode(payload: IssueEmailCodeRequest) {
  const res = await ClientApi<IssueEmailCodeResponse>("/users/email/verification", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

// 인증번호 확인
export async function verifyEmailCode(payload: VerifyEmailCodeRequest) {
  const res = await ClientApi<VerifyEmailCodeResponse>("/users/email/verification/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.msg;
}
