import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "@/components/common/Toast";
import { updateAddress } from "../api/delivery.api";

export const useUpdateAddress = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({
        queryKey: ["trade-detail"],
        refetchType: "active",
      });
      Toast({ message: "배송지가 수정되었습니다.", type: "SUCCESS" });
    },
    onError: error => {
      const message = error instanceof Error ? error.message : "서버 오류가 발생했습니다.";
      Toast({ message, type: "ERROR" });
    },
  });
};
