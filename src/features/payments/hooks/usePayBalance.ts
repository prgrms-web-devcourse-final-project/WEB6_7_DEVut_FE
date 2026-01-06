import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payBalance } from "../api/Payments.api";
import Toast from "@/components/common/Toast";

export const usePayBalance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: payBalance,

    onSuccess: () => {
      Toast({ message: "잔금처리를 완료하였습니다.", type: "SUCCESS" });
      qc.invalidateQueries({
        queryKey: ["trade-detail"],
        refetchType: "active",
      });
    },
    onError: () => {
      Toast({ message: "결제에 실패하였습니다.", type: "ERROR" });
    },
  });
};
