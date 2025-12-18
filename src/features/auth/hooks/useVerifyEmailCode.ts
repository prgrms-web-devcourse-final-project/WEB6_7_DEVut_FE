import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode } from "../api/emailVerification.api";

export function useVerifyEmailCode() {
  return useMutation({
    mutationFn: verifyEmailCode,
  });
}
