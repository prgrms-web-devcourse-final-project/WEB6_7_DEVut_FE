import Toast from "@/components/common/Toast";
import { useMutation } from "@tanstack/react-query";
import { approveWithdrawal } from "../api/withdrawal.api";

type ApproveWithdrawalResponse = {
  data: null;
};

type ApproveWithdrawalRequest = {
  withdrawalId: number;
};

export const useApproveWithdrawal = () => {
  return useMutation<ApproveWithdrawalResponse, Error, ApproveWithdrawalRequest>({
    mutationFn: approveWithdrawal,
    onSuccess: () => {
      Toast({
        message: "출금 요청이 승인되었습니다.",
        type: "SUCCESS",
      });
    },
  });
};
