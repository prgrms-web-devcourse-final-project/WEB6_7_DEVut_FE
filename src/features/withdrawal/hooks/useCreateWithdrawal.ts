import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWithdrawal } from "../api/withdrawal.api";
import Toast from "@/components/common/Toast";

export const useCreateWithdrawal = () => {
  const qc = useQueryClient();
  return useMutation<CreateWithdrawalResponse, Error, CreateWithdrawalRequest>({
    mutationFn: createWithdrawal,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["history-withdrawals"] });
      Toast({ message: "출금요청이 완료되었습니다.", type: "SUCCESS" });
    },
    onError: () => {
      Toast({ message: "출금요청에 실패하였습니다.", type: "ERROR" });
    },
  });
};
