import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal } from "../api/withdrawal.api";
import Toast from "@/components/common/Toast";

type ErrorType = {
  msg: string;
  resultCode: string;
  data: null;
};

export const useCreateWithdrawal = () => {
  const qc = useQueryClient();
  return useMutation<CreateWithdrawalResponse, ErrorType, CreateWithdrawalRequest>({
    mutationFn: createWithdrawal,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["history-withdrawals"] });
      qc.invalidateQueries({ queryKey: ["my-wallet"] });
      Toast({
        message: "출금 요청이 완료되었습니다.",
        type: "SUCCESS",
      });
    },
    onError: err => {
      Toast({
        message: err.msg ?? "출금 요청 중 오류가 발생했습니다.",
        type: "ERROR",
      });
    },
  });
};
