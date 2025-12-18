import { useMutation } from "@tanstack/react-query";
import { issueEmailCode } from "../api/emailVerification.api";

export function useIssueEmailCode() {
  return useMutation({
    mutationFn: issueEmailCode,
  });
}
